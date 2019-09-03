#複製一份暫存檔
cp ./index.js index.js.tmp
#刪除最後一行
sed -i '' -e '$ d' index.js.tmp
#暫存檔複製成正式檔
cp -f ./index.js.tmp ./index.js
#刪除暫存檔
rm -f ./index.js.tmp
#cat index.js >> tmp.js
