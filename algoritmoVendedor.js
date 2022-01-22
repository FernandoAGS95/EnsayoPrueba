const yargs = require('yargs');
const { Client } = require('pg');
const fs = require('fs');


const config = {
    user: 'postgres',
    host: 'localhost',
    database: 'bikeShop',
    password: 'ADMIN',
    port: 5432,
};
const client = new Client(config);
client.connect();

const consultaUsuario = async (usuario) => {
    const res = await client.query(`Select * from customers as a where a.first_name = '${usuario}' `);
    client.end();
    return res.rows[0]
};

const argv = yargs
    .command(
        'ingreso',
        'Consulta de usuario y calculo de montos con descuento',
        {
            customer: {
                describe: 'customer',
                demand: true,
                alias: 'u',
            },

            monto: {
                describe: 'monto',
                demand: true,
                alias: 'p',
            },
            descuento: {
                describe: 'descuento',
                demand: true,
                alias: 'd',
            },
        },
        async (args) => {
            try {
                let exito = await consultaUsuario(args.customer);
               

                let descuento = args.monto * (args.descuento / 100);
                let calculado = args.monto - descuento;

                if (exito) {
                    
                    let data = ` Cliente: ${exito.first_name} 
                                       su compra es de ${args.monto} pesos
                                       porcentaje de descuento es ${args.descuento}% da un total de ${calculado}`;
                    fs.writeFile('Calculado.txt', data, (err) => {
                        if (err) throw err;
                        
                    });
                    fs.readFile('./Calculado.txt','utf-8',(err,data)=>{
                        if(err){
                            console.log(err);
                            return
                        }
                        console.log(data);
                    })

                }else{

                    let data = ` Don: ${args.customer} 
                    Actualmente usted no es cliente en la tienda, favor registrarse para poder realizar compras `;
                    fs.writeFile('Calculado.txt', data, (err) => {
                        if (err) throw err;
                        
                    });
                    fs.readFile('./Calculado.txt','utf-8',(err,data)=>{
                        if(err){
                            console.log(err);
                            return
                        }
                        console.log(data);
                    })
                }

            } catch (error) {
               console.log(error);
            }
        }
    )
    .help().argv;