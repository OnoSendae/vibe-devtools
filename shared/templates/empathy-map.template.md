---
type: empathy-map
persona: {{PERSONA_SLUG}}
created_at: {{CREATED_AT}}
based_on: {{RESEARCH_SOURCE}}
---

# Empathy Map: {{PERSONA_NAME}}

**Persona**: [{{PERSONA_NAME}}](../personas/{{PERSONA_SLUG}}.md)  
**Created**: {{CREATED_AT}}  
**Based on**: {{RESEARCH_SOURCE}}

## 🗺️ Empathy Map Quadrants

### 🗣️ SAYS (O que diz)

Quotes literais e comentários verbais:

{{SAYS_ITEMS}}

### 💭 THINKS (O que pensa)

Pensamentos internos e preocupações não verbalizadas:

{{THINKS_ITEMS}}

### 🏃 DOES (O que faz)

Ações observáveis e comportamentos:

{{DOES_ITEMS}}

### ❤️ FEELS (O que sente)

Emoções e estados emocionais:

{{FEELS_ITEMS}}

## 📊 Quadrant Visualization

```mermaid
quadrantChart
    title Empathy Map - {{PERSONA_NAME}}
    x-axis Low Energy --> High Energy
    y-axis Negative --> Positive
    quadrant-1 Motivated
    quadrant-2 Stressed
    quadrant-3 Frustrated
    quadrant-4 Calm
{{MERMAID_POINTS}}
```

## 💡 Key Insights

{{INSIGHTS_SUMMARY}}

## 🔗 Related

- **Persona**: [{{PERSONA_NAME}}](../personas/{{PERSONA_SLUG}}.md)
- **Journey Maps**: {{JOURNEY_MAPS_LINKS}}
- **Research**: {{RESEARCH_LINKS}}

---

**Confidence**: {{CONFIDENCE}}  
**Next Steps**: {{NEXT_STEPS}}

