
# AI Dashboard - Local Çalıştırma

Bu projeyi local'de çalıştırmak için:

## Windows Kullanıcıları
1. `start-local.bat` dosyasına çift tıklayın
2. Terminal açılacak ve otomatik olarak kurulum yapılacak
3. Server başladığında tarayıcınızda `http://localhost:5173` adresine gidin

## Linux/Mac Kullanıcıları
1. Terminal açın
2. `chmod +x start-local.sh` komutu ile dosyayı çalıştırılabilir yapın
3. `./start-local.sh` komutu ile başlatın
4. Server başladığında tarayıcınızda `http://localhost:5173` adresine gidin

## Gereksinimler
- Node.js (v18 veya üzeri)
- npm

## Manuel Başlatma
Eğer script'ler çalışmazsa:
1. `cd server` 
2. `npm install`
3. `npm run dev`

## Durdurma
Terminal'de `Ctrl+C` tuşlarına basın.
