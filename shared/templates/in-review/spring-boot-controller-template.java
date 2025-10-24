package [PACKAGE_NAME].api.controller;

import [PACKAGE_NAME].application.service.[SERVICE_NAME];
import [PACKAGE_NAME].api.dto.[DTO_NAME];
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/[RESOURCE_PATH]")
@RequiredArgsConstructor
@Slf4j
public class [CONTROLLER_NAME] {

    private final [SERVICE_NAME] service;

    @GetMapping
    public ResponseEntity<List<[DTO_NAME]>> getAll() {
        log.info("Fetching all [RESOURCE_NAME]");
        var result = service.findAll();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<[DTO_NAME]> getById(@PathVariable Long id) {
        log.info("Fetching [RESOURCE_NAME] with id: {}", id);
        var result = service.findById(id);
        return ResponseEntity.ok(result);
    }

    @PostMapping
    public ResponseEntity<[DTO_NAME]> create(@Valid @RequestBody [DTO_NAME] dto) {
        log.info("Creating new [RESOURCE_NAME]");
        var result = service.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @PutMapping("/{id}")
    public ResponseEntity<[DTO_NAME]> update(
            @PathVariable Long id,
            @Valid @RequestBody [DTO_NAME] dto) {
        log.info("Updating [RESOURCE_NAME] with id: {}", id);
        var result = service.update(id, dto);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        log.info("Deleting [RESOURCE_NAME] with id: {}", id);
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}

