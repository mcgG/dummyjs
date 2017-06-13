var scripts = {
    Insert: 'INSERT INTO FILEINFO (fileName, path, lastModifiedTime) values (?, ?, now())',
    Update: 'UPDATE FILEINFO SET lastModifiedTime=now() WHERE fileName=?',
    Delete: 'DELETE FROM FILEINFO WHERE fileName=?',
    QueryAll: 'SELECT * FROM FILEINFO',
    QueryByFileName: 'SELECT * FROM FILEINFO WHERE fileName=?',
    QueryByDateRange: 'SELECT * FROM FILEINFO WHERE lastModifiedTime>=? and lastModifiedTime<=?'
}

module.exports = scripts;
