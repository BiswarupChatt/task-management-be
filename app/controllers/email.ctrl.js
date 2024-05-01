const express = require("express");

const sendEmail = require("../models/email-model");

const emailCtrl = {};

emailCtrl.send = async (req, res) => {
    try {
      await sendEmail(req.body.to, req.body.subject, req.body.text);
      res.status(200).send("Email sent successfully");
    } catch (error) {
      console.error(error); // Log the error for internal debugging
      res.status(500).json({ error: "Failed to send email" });
    }
  };
  