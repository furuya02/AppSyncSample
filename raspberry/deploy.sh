DIR=MyDevice

files=("index.js" "Mqtt.js" "Pixels.js" "SevenSegLED.js" "ADConv.js")
for ((i = 0; i < ${#files[@]}; i++)) {
    scp ./${files[i]} pi@10.0.0.10:~/$DIR
}

# certs=("private.pem" "root-CA.crt" "cert.pem")
# for ((i = 0; i < ${#certs[@]}; i++)) {
#     scp ./${certs[i]} pi@10.0.0.10:~/$DIR
# }
