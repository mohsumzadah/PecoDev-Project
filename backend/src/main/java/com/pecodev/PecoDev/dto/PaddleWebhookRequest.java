package com.pecodev.PecoDev.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import java.util.Map;

@Data
public class PaddleWebhookRequest {
    @JsonProperty("event_type")
    private String eventType;

    private EventData data;

    @Data
    public static class EventData {
        private String id; // This is the transaction ID (txn_...)
        private String status;

        @JsonProperty("custom_data")
        private Map<String, Object> customData;
    }
}