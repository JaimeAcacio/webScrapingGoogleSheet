const sheet = SpreadsheetApp.getActive()
const data = new Date()
const day = ("0" + data.getDate()).slice(-2)
const month = ("0" + (data.getMonth() +1 )).slice(-2)
const year = data.getFullYear().toFixed()
const formatDate =`${day}/${month}/${year}`
const currentMonth = `${month}/${year}`
const selectTable = nameTabel => sheet.setActiveSheet(sheet.getSheetByName(nameTabel), true)
const setFormulaTabel = stringFormula => sheet.getCurrentCell().setFormula(stringFormula)
const setDataTabel = data => sheet.getDataRange().setValues(data)


const dailyDataRoutine = () => {
  selectTable(TABNAME_TABLE).hideSheet()
  setFormulaTabel(`=IMPORTDATA("URL_HERE";";")`)

  const data = sheet.getSheetByName(TABNAME_TABLE).getDataRange().getValues()
  const handleData = data.reduce((acc, item)=>{
    const angel = item[21]
    const stonecode = item[5]
 
      acc[angel] = acc[angel] || []
      acc[angel].push(stonecode)
        return acc
},{})

const objToArray = Object.entries(handleData)

const handledData = objToArray.map(([key,value])=>{ 
  const angel = key
  const totalOS = value.length
  const scDiferents = [...new Set(value)].length

    return [angel,totalOS,scDiferents]
})

const cleanData = handledData.filter(([key,value])=> value !== '0' & key !== 'Técnico' & key !== '' & key !== 'TECHNICAL_NAME' & key !== 'undefined')

const diarieData = selectTable(TABNAME_TABLE)
     
diarieData.getRange('A2:C20').clear({contentsOnly: true})

    cleanData.forEach(([angel,totalOS,scdiferents]) => diarieData.appendRow([angel,totalOS,scdiferents]))
       
      sheet.getActiveSheet().getFilter().sort(3, false)

        return cleanData
}




