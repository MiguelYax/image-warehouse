##------------------------------------------------------------------
## CREAR ARCHIVO EN CONSOLA 
## nano run.sh
## copiar el contenido a la consola
## ctrl+o
## enter
## ctrl+x
## -----------------------------------------------------------------
## EJECUTAR EL ARCHIVO
## chmod +x run.sh 
## ./run.sh
##------------------------------------------------------------------


echo INSTALAR NODE JS
curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
sudo apt -y install nodejs
echo INSTALAR FOREVER

sudo npm install forever -g
echo DOWNLOAD PROYECT
git clone https://github.com/MiguelYax/image-warehouse.git
cd image-warehouse
echo INSTALAR DEPENDENCIAS
sudo npm install 

echo EJECUTAR COMO DEMOÑO
sudo forever start bin/www
echo PETICION DE PRUEBA DE SITIO
curl  http://127.0.0.1/version