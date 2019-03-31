let query = require('./query');


query(
    `
    CREATE TABLE IF NOT EXISTS IW_USER(
        UUID VARCHAR(36) NOT NULL PRIMARY KEY, 
        FIRSTNAME VARCHAR(255) NOT NULL,
        LASTNAME VARCHAR(255) NOT NULL,
        EMAIL VARCHAR(255) NOT NULL,
        PASSWORD VARCHAR(1000) NOT NULL
    );
    `,
    console.log
);

query(
    `
    CREATE TABLE IF NOT EXISTS IW_IMAGE(
        UUID VARCHAR(36) NOT NULL PRIMARY KEY, 
        NAME VARCHAR(255) NOT NULL,
        PUBLIC BIT NOT NULL DEFAULT 0, 
        UUIDUSER VARCHAR(36) NOT NULL,
        EXTENSION VARCHAR(10) NOT NULL,
        CREATED DATETIME DEFAULT CURRENT_TIMESTAMP, 
        FOREIGN KEY (UUIDUSER)
        REFERENCES IW_USER(UUID)
    );
    `,
    console.log
);

// query(
//     `
//     INSERT INTO IW_USER (UUID, FIRSTNAME, LASTNAME, EMAIL, \`PASSWORD\`) VALUES ('${uuidv4().replace(
//         /-/g,
//         '\\-'
//     )}', 'MIGUEL', 'YAX', 'myax@hotmail.com', '12345');
//     INSERT INTO IW_USER (UUID, FIRSTNAME, LASTNAME, EMAIL, \`PASSWORD\`) VALUES ('${uuidv4().replace(
//         /-/g,
//         '\\-'
//     )}', 'BAYRON', 'CARRANZA', 'bcarranza@hotmail.com', '12345');
//     `,
//     console.log
// );
