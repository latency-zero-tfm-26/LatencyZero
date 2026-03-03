# 🗃️ Data

Los datos utilizados para entrenar los modelos se obtuvieron mediante técnicas de **web scraping** y fueron posteriormente recopilados y procesados para su análisis y preparación en este proyecto.

Las fuentes de información incluyeron sitios web especializados en componentes de PC:  

- [PCComponentes](https://www.pccomponentes.com)  
- [TechPowerUp](https://www.techpowerup.com)  
- [PCPartPicker](https://pcpartpicker.com)
- [Pangoly](https://pangoly.com)
- [Steam](https://store.steampowered.com)

Estos portales proporcionan información detallada sobre marcas, modelos y especificaciones técnicas, lo que permitió construir un dataset representativo y de calidad para el entrenamiento del modelo.

![dataset](/img/dataset_components_03.png)

Además, se incluyen requisitos de hardware para videojuegos obtenidos mediante **web scraping** de [Steam](https://store.steampowered.com/?l=spanish). Estos datos permiten que el agente disponga de información local sobre requisitos mínimos y recomendados en caso de que el usuario consulte sobre compatibilidad con videojuegos.

## 📂 Estructura del proyecto

```
.
├── README.md
├── images
├── processed
│   ├── components_01.csv
│   ├── components_01.json
│   ├── components_02.csv
│   ├── components_03.csv
│   └── components_04.csv
│
└── raw
    ├── ai_db_vectorial
    │   ├── cases_pcpartpicker.jsonl
    │   ├── cpu_cooler_pcpartpicker.jsonl
    │   ├── cpu_pcpartpicker.jsonl
    │   ├── gpu_pcpartpicker.jsonl
    │   ├── hw_survey_full.json
    │   ├── monitor_pcpartpicker.jsonl
    │   ├── motherboard_pcpartpicker.jsonl
    │   ├── os_pcpartpicker.jsonl
    │   ├── pangoly.jsonl
    │   ├── pcpartpicker_motherboards+components.jsonl
    │   ├── productos_cpu.json
    │   ├── productos_pccomponentes.json
    │   ├── psu_pcpartpicker.jsonl
    │   ├── ram_pcpartpicker.jsonl
    │   ├── req_minimos.json
    │   ├── req_recomendados.json
    │   ├── storage_pcpartpicker.jsonl
    │   ├── top1_hw.json
    │   ├── top2_hw.json
    │   └── top3_hw.json
    │
    ├── pangoly
    │   └── pangoly.jsonl
    │
    ├── pccomponentes
    │   ├── productos_pccomponentes.csv
    │   └── productos_pccomponentes.json
    │
    ├── pcpartpicker
    │   ├── cases_pcpartpicker.jsonl
    │   ├── cpu_cooler_pcpartpicker.jsonl
    │   ├── cpu_pcpartpicker.jsonl
    │   ├── gpu_pcpartpicker.jsonl
    │   ├── monitor_pcpartpicker.jsonl
    │   ├── motherboard_pcpartpicker.jsonl
    │   ├── os_pcpartpicker.jsonl
    │   ├── psu_pcpartpicker.jsonl
    │   ├── ram_pcpartpicker.jsonl
    │   ├── storage_pcpartpicker.jsonl
    │   ├── csv
    │   │   ├── cases_pspartpicker.csv
    │   │   ├── cpu_cooler_pspartpicker.csv
    │   │   ├── cpu_pspartpicker.csv
    │   │   ├── gpu_pspartpicker.csv
    │   │   ├── monitor_pspartpicker.csv
    │   │   ├── motherboard_pspartpicker.csv
    │   │   ├── os_pspartpicker.csv
    │   │   ├── psu_pspartpicker.csv
    │   │   ├── ram_pspartpicker.csv
    │   │   └── storage_pspartpicker.csv
    │   │
    │   └── json
    │       ├── cases_pspartpicker.json
    │       ├── cpu_cooler_pspartpicker.json
    │       ├── cpu_pspartpicker.json
    │       ├── gpu_pspartpicker.json
    │       ├── monitor_pspartpicker.json
    │       ├── motherboard_pspartpicker.json
    │       ├── os_pspartpicker.json
    │       ├── psu_pspartpicker.json
    │       ├── ram_pspartpicker.json
    │       └── storage_pspartpicker.json
    │
    ├── steam
    │   ├── csv_data
    │   │   ├── hw_survey_full.csv
    │   │   ├── req_minimos.csv
    │   │   ├── req_recomendados.csv
    │   │   └── ranked_hardware/
    │   │       ├── top1_hw.csv
    │   │       ├── top2_hw.csv
    │   │       └── top3_hw.csv
    │   │
    │   └── json_data
    │       ├── hw_survey_full.json
    │       ├── req_minimos.json
    │       ├── req_recomendados.json
    │       └── ranked_hardware/
    │           ├── top1_hw.json
    │           ├── top2_hw.json
    │           └── top3_hw.json
    │
    └── techpowerup
        ├── productos_cpu.csv
        └── productos_cpu.json
```

- `raw/` → Datos originales obtenidos mediante scraping.
- `processed/` → Datos limpios y transformados listos para análisis y entrenamiento.
- `images/` → Recursos gráficos obtenidos mediante scraping para el entrenamiento.
