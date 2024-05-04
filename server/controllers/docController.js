const express = require("express");
const db = require("../db/connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "jfakhhgahk";

exports.getAllUsers = (req, res) => {
  const sql = "SELECT * FROM doctor";
  db.query(sql, (err, data) => {
    if (err) {
      // Error occurred, return 500 status code and error message
      return res.status(500).json({ error: err.message });
    }
    // Successful query execution, return data as JSON
    return res.status(200).json(data);
  });
};

exports.createUser = (req, res) => {
  const { name, phone, designation, password } = req.body;
  if (!name || !phone || !designation || !password) {
    return res.status(400).json({ error: "Invalid input" });
  }

  bcrypt.hash(password, 10, (err, hashedPass) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const sql =
      "INSERT INTO doctor (name, phone_no, designation, password) VALUES (?,?,?,?)";
    db.query(sql, [name, phone, designation, hashedPass], (err, data) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(201).json({ message: "User created" });
    });
  });
};

exports.loginUser = (req, res) => {
  const { phone, password } = req.body;
  if (!phone || !password) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const sql = "SELECT * FROM doctor WHERE phone_no = ?";
  db.query(sql, [phone], (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (data.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = data[0];
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!result) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      // const trimmedUser = { ...user };
      // delete trimmedUser.password;
      const token = jwt.sign({ phone: user.phone_no }, JWT_SECRET);
      return res.status(200).json({ status: "ok", data: token });
    });
  });
};

exports.getUser = (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ error: "Invalid input" });
  }
  const user = jwt.verify(token, JWT_SECRET);
  const phone = user.phone;
  const sql = "SELECT * FROM doctor WHERE phone_no = ?";
  db.query(sql, [phone], (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (data.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const trimmedUser = { ...data[0] };
    delete trimmedUser.password;
    return res.status(200).json({ status: "ok", data: trimmedUser });
  });
  // res.send(user);
};
