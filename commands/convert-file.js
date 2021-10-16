const fs = require('fs')
const { hideBin } = require('yargs/helpers')
const argv = require('yargs/yargs')(hideBin(process.argv)).argv

// Convert Log to JSON Format
async function convertToJSON(data) {

  const arrData = []
  var wordArr = data.split(" ");
  for (dataLog of wordArr) {
    arrData.push(dataLog)
  }
  return arrData
}

async function convert(options) {
  const typeFormat = options.type === 'json' ? options.type : 'txt'
  const outputDir = options.output ? options.output_dir : 'D:/'
  const result = await readFile(options.file)

  if (result.success) {
    if (options.type && !(['text', 'json'].includes(options.type))) {
      throw new Error('Type of file convertion not found')
    }
    let data = result.data
    
    if (typeFormat === 'json') {
      data = await convertToJSON(data)
    }
    const writeFileToDir = await writeFile(outputDir, typeFormat, data)
    if (writeFileToDir.success) {
      console.log(`Yeaay!! log already writing at "${writeFileToDir.data}" `)
    } else {
      throw new Error(writeFileToDir.message)
    }
  } else {
    throw new Error(`File "${options.file}" is not found`)
  }
}

// Read File
async function readFile(pathFile) {
  try {
    return {
      success: true,
      data: (await fs.readFileSync(pathFile, 'utf-8'))
    }
  } catch (err) {
    return {
      success: false,
      message: err.message
    }
  }
}

// Write File
async function writeFile(pathFile, extension, data) {
  try {
    const fileName = pathFile.split('/').pop()
    const dataFormat = extension === 'txt' ? data : JSON.stringify(data, null, 4)
    const fileOutput = fileName.match(/\./g) ? pathFile : `${pathFile}/log.${extension}`
    await fs.writeFileSync(fileOutput, dataFormat)
    return {
      success: true,
      data: fileOutput
    }
  } catch (err) {
    return {
      success: false,
      message: err.message
    }
  }
}

module.exports = convert