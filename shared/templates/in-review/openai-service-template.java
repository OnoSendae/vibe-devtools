package [PACKAGE_NAME].infrastructure.ai;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class OpenAIService {

    private final RestTemplate restTemplate;
    
    @Value("${openai.api.key}")
    private String apiKey;
    
    @Value("${openai.api.url:https://api.openai.com/v1}")
    private String apiUrl;
    
    @Value("${openai.model:gpt-4}")
    private String model;

    public String chat(String prompt) {
        return chat(prompt, 0.7, 1000);
    }

    public String chat(String prompt, double temperature, int maxTokens) {
        log.info("Sending chat request to OpenAI with model: {}", model);
        
        var headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);
        
        var requestBody = Map.of(
            "model", model,
            "messages", List.of(Map.of("role", "user", "content", prompt)),
            "temperature", temperature,
            "max_tokens", maxTokens
        );
        
        var request = new HttpEntity<>(requestBody, headers);
        
        try {
            var response = restTemplate.postForEntity(
                apiUrl + "/chat/completions",
                request,
                Map.class
            );
            
            var choices = (List<Map<String, Object>>) response.getBody().get("choices");
            var message = (Map<String, String>) choices.get(0).get("message");
            
            return message.get("content");
            
        } catch (Exception e) {
            log.error("Error calling OpenAI API", e);
            throw new RuntimeException("Failed to get response from OpenAI", e);
        }
    }

    public String transcribeAudio(byte[] audioData, String fileName) {
        log.info("Sending audio transcription request to Whisper");
        
        var headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        headers.setBearerAuth(apiKey);
        
        try {
            var response = restTemplate.postForEntity(
                apiUrl + "/audio/transcriptions",
                null,
                Map.class
            );
            
            return (String) response.getBody().get("text");
            
        } catch (Exception e) {
            log.error("Error calling Whisper API", e);
            throw new RuntimeException("Failed to transcribe audio", e);
        }
    }
}

