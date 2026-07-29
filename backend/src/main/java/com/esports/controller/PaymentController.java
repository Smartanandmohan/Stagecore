package com.esports.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*")
public class PaymentController {

    @PostMapping("/webhook")
    public ResponseEntity<String> handlePaymentWebhook(@RequestBody String payload, @RequestHeader("Stripe-Signature") String sigHeader) {
        // Mock Stripe Webhook Endpoint
        // In production, verify signature using Stripe Java SDK:
        // Event event = Webhook.constructEvent(payload, sigHeader, "whsec_...");
        
        System.out.println("Received payment webhook payload: " + payload);
        
        // Handle event.getType() == "payment_intent.succeeded"
        // Update user wallet balance in DB
        
        return ResponseEntity.ok("Webhook received");
    }
}
