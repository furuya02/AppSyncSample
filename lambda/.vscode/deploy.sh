#--------------- Lambdaのみ更新 ---------------------------
export Profile=developer
export ZipName=/tmp/upload.zip
export FunctionNam=AppSyncSample

rm ${ZipName} 
cd dst
zip -r ${ZipName} *
aws lambda update-function-code --function-name ${FunctionNam}  --zip-file fileb://${ZipName} --publish --p ${Profile}

