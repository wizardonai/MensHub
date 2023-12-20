Elenco comandi

Premessa -> avere node installato e npm come variabile globale

--Comandi--
npm install

node database.js


# Apache
$ a2enmod mod_proxy

Nella config del VirtualHost di Apache

<Directory />

ProxyPass /api/ http://127.0.0.1:1234/api/
ProxyPassReverse /api/ http://127.0.0.1:1234/api/


browser --> POST /api/register?user=foo
--> Apache

POST http://127.0.0.1:1234/api/register?user=foo
Apache richiede a Node --> http://127.0.0.1:1234/api/register?user=foo
Node risponde (JSON) ad Apache

Apache risponde al browser

se nella response c'è location  (redirect scritta in node)

http://127.0.0.1:1234/api/register --> http://127.0.0.1:1234/api/register/0
Apache usa ProxyPassReverse per riscrivere URL (redirect/location)

/api/register/0 --> al browser --> http://ip_pub_di_apache/api/register/0

</Directory>

