import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// 壓縮品質設定
const qualitySettings = {
  jpgQuality: 81,
  pngQuality: 9,
  webpQuality: 100,
};

// 最終輸出路徑
const layoutDir = './src/assets/layout';

// 每次執行時清空 src/assets/layout
if (fs.existsSync(layoutDir)) {
  fs.rmdirSync(layoutDir, { recursive: true });
}
fs.mkdirSync(layoutDir, { recursive: true });

// import 和 export 宣告
let imports = [];
let exportList = [];

// 可接受的圖片類型
const supportedImageTypes = ['.jpg', '.jpeg', '.png', '.gif', '.svg'];

// 處理資料夾中的所有圖片，略過 nominify 的資料夾
function processDirectory(directory, nominify = false) {
  fs.readdirSync(directory, { withFileTypes: true }).forEach((entry) => {
    const absolutePath = path.join(directory, entry.name);
    const isNominify =
      nominify || (entry.isDirectory() && entry.name === 'nominify');

    if (entry.isDirectory()) {
      processDirectory(absolutePath, isNominify);
    } else if (
      entry.isFile() &&
      supportedImageTypes.includes(path.extname(entry.name).toLowerCase())
    ) {
      processImage(absolutePath, directory, entry.name, isNominify);
    }
  });
}

// 處理單一圖片文件
function processImage(filePath, directory, fileName, nominify) {
  const ext = path.extname(fileName).toLowerCase();
  const filenameWithoutExt = path.basename(fileName, ext);
  const relativePath = path.relative('./input-source', directory);
  const outputFilePath = path.join(layoutDir, relativePath, fileName);

  // 確保輸出資料夾存在
  fs.mkdirSync(path.dirname(outputFilePath), { recursive: true });

  if (!nominify && (ext === '.jpg' || ext === '.png')) {
    // 非 nominify 資料夾時壓縮 jpg 或 png 圖片
    handleJpgPngImage(
      filePath,
      fileName,
      ext,
      relativePath,
      filenameWithoutExt,
    );
  } else {
    // 其他檔案或位於 nominify 資料夾內的文件，直接複製
    fs.copyFile(filePath, outputFilePath, (err) => {
      if (err) console.error(err);
      else console.log(`檔案複製完成: ${outputFilePath}`);
    });
    collectImportExportStatements(relativePath, fileName, filenameWithoutExt);
  }
}

// 處理 jpg 和 png 圖片
function handleJpgPngImage(
  filePath,
  fileName,
  ext,
  relativePath,
  filenameWithoutExt,
) {
  const outputFilePath = path.join(layoutDir, relativePath, fileName);
  const qualityOptions = ext === '.png' ? 'compressionLevel' : 'quality';
  sharp(filePath)
    .toFormat(ext.substring(1), {
      [qualityOptions]: qualitySettings[`${ext.substring(1)}Quality`],
      palette: true,
    })
    .toFile(outputFilePath)
    .then(() => console.log(`壓縮並輸出完成: ${outputFilePath}`))
    .catch((err) => console.error(err));

  // 生成 import 和 export 語法
  collectImportExportStatements(relativePath, fileName, filenameWithoutExt);

  // 處理 webp 格式
  const outputWebpFilePath = path.join(
    layoutDir,
    relativePath,
    `${filenameWithoutExt}Webp.webp`,
  );
  sharp(filePath)
    .toFormat('webp', { quality: qualitySettings.webpQuality })
    .toFile(outputWebpFilePath)
    .then(() => console.log(`壓縮並輸出 WebP 完成: ${outputWebpFilePath}`))
    .catch((err) => console.error(err));

  // 收集 webp 的 import 和 export 語句
  const webpVarName = formatVarName(filenameWithoutExt + 'Webp', relativePath);
  const webpImportPath = `./${path
    .join(relativePath, `${filenameWithoutExt}Webp.webp`)
    .replace(/\\/g, '/')}`;
  imports.push(`import ${webpVarName} from '${webpImportPath}';`);
  exportList.push(webpVarName);
}

// 生成 import 和 export 語法
function collectImportExportStatements(
  relativePath,
  fileName,
  filenameWithoutExt = '',
) {
  const varName = formatVarName(filenameWithoutExt, relativePath);
  const importPath = `./${path
    .join(relativePath, fileName)
    .replace(/\\/g, '/')}`;
  imports.push(`import ${varName} from '${importPath}';`);
  exportList.push(varName);
}

// 格式化變數名稱
function formatVarName(filenameWithoutExt, relativePath) {
  const pathParts = relativePath.split(path.sep).filter((p) => p);
  const formattedFilename = formatFileName(filenameWithoutExt);
  return (
    pathParts.length > 0
      ? formatPathPart(pathParts) + capitalizeFirstLetter(formattedFilename)
      : formattedFilename
  )
    .replace(/\W/g, '')
    .replace(/^-/, '');
}

// 格式化文件名稱，將命名的破折號轉換為駝峰
function formatFileName(filename) {
  return filename
    .replace(/\W/g, '_')
    .replace(/^-/, '')
    .split('_')
    .map((part, index) =>
      index === 0 ? part.toLowerCase() : capitalizeFirstLetter(part),
    )
    .join('');
}

// 格式化資料夾路徑部分
function formatPathPart(parts) {
  return parts.map((part) => formatFileName(part)).join('');
}

// 首字母大寫
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// 生成 index.js 檔案
function generateIndexFile() {
  const indexContent = `${imports.join('\n')}\n\nexport { ${exportList.join(
    ', ',
  )} };\n`;
  fs.writeFileSync(path.join(layoutDir, 'index.js'), indexContent);
}

// 處理 input-source 資料夾
processDirectory('./input-source');

// 處理完畢後生成 index.js
generateIndexFile();
