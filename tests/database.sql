CREATE TABLE doctor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone_no VARCHAR(20) NOT NULL,
    designation VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    patients TEXT DEFAULT NULL
);

CREATE TABLE patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    sex VARCHAR(10) NOT NULL,
    ledgerId INT,
    docId INT,
    FOREIGN KEY (docId) REFERENCES doctor(id)
);

CREATE INDEX ledgerId_index ON patients(ledgerId);

CREATE TABLE prescription_ledger (
    ledgerId INT PRIMARY KEY,
    docId INT,
    findings TEXT,
    genInstructions TEXT,
    files TEXT,
    prescId INT,
    FOREIGN KEY (ledgerId) REFERENCES patients(ledgerId),
    FOREIGN KEY (docId) REFERENCES doctor(id)
);

CREATE TABLE prescriptionDetails (
    prescId INT PRIMARY KEY,
    drugNames TEXT,
    days INT,
    times INT,
    tablets INT,
    foodHabits TEXT,
    advInstructions TEXT
);
