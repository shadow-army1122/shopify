```mermaid
flowchart LR
    %% SDLC Phases
    Req[1. Requirement Analysis] --> Design[2. System Design]
    Design --> Dev[3. Implementation/Development]
    Dev --> Test[4. Testing & QA]
    Test --> Deploy[5. Deployment]
    Deploy --> Maint[6. Maintenance & Updates]
    
    classDef phase fill:#d4edda,stroke:#28a745,stroke-width:2px;
    class Req,Design,Dev,Test,Deploy,Maint phase;
```
