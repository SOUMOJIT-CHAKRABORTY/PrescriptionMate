const express = require("express");
const db = require("../db/connection");

exports.getAllUsers = (req, res) => {
  const sql = "SELECT * FROM users";
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
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: "Invalid input" });
  }
  const sql = "INSERT INTO users (username, email, password) VALUES (?,?,?)";
  db.query(sql, [username, email, password], (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(201).json({ message: "User created" });
  });
};

exports.loginUser = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Invalid input" });
  }
  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(sql, [username, password], (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    if (data.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    return res.status(200).json(data[0]);
  });
};
