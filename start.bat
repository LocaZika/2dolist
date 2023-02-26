@echo off
if exist node_modules\ (
  cd batch
  start /min cmd /k call server.bat
  start /min cmd /k call todolist.bat
) else (
  cd batch
  start /wait /min modules.bat
  start /min cmd /k call server.bat
  start /min cmd /k call todolist.bat
)
exit