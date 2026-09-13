export interface ProjectCaseStudy {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  category: string;
  stack: string[];
  systemHighlights: {
    label: string;
    value: string;
  }[];
  challenge: string;
  architecturalSolution: string;
  systemPipeline: string[];
  capabilities: string[];
  codeConcept?: {
    filename: string;
    language: string;
    snippet: string;
  };
}

export const PROJECTS: ProjectCaseStudy[] = [
  {
    id: "travel-booking-platform",
    num: "01",
    title: "Travel & Hotel Booking Architecture",
    subtitle: "Dynamic Pricing, Hierarchical Validation & Invoicing Engine",
    category: "CORE BACKEND SYSTEMS · CONCURRENCY",
    stack: ["Python", "Django", "Django REST Framework", "PostgreSQL"],
    systemHighlights: [
      { label: "Architecture", value: "Multi-Tier Service Layer" },
      { label: "Core Database", value: "PostgreSQL with ACID Guarantees" },
      { label: "Workflow", value: "Sub Admin & Super Admin Approval Chain" },
      { label: "Integrations", value: "Hotel & Flight Booking Pipelines" },
    ],
    challenge:
      "A travel booking engine cannot afford inconsistent financial calculations or bypassed approval states. Booking reservations, dynamic price fluctuations based on availability, discount rules, and multi-party invoice generation require deterministic state transitions and strict authorization.",
    architecturalSolution:
      "Engineered decoupled booking services in Django REST Framework backed by PostgreSQL. Implemented transactional integrity for dynamic pricing and discount computations. Designed an approval state-machine where mandatory business rules and required parameters are verified before Sub Admin and Super Admin sign-offs, producing immutable invoice records.",
    systemPipeline: [
      "CLIENT_REQUEST",
      "DYNAMIC_PRICING_ENGINE",
      "BUSINESS_RULES_VALIDATOR",
      "SUB_ADMIN_VERIFICATION",
      "SUPER_ADMIN_AUTHORIZATION",
      "FINANCIAL_INVOICE_GENERATION",
    ],
    capabilities: [
      "Dynamic Pricing & Discount Lifecycle Management",
      "Hotel & Flight Invoice Financial Integrity Checks",
      "Multi-Role Permission Validation (Sub Admin & Super Admin)",
      "Strict Transaction Boundaries with Zero State Drift",
      "Auditable Booking Record Archival in PostgreSQL",
    ],
    codeConcept: {
      filename: "services/pricing_and_approval_workflow.py",
      language: "python",
      snippet: `@transaction.atomic
def process_booking_authorization(booking_id: UUID, actor_role: str) -> BookingState:
    booking = Booking.objects.select_for_update().get(id=booking_id)
    
    # 1. Enforce business constraints & field completeness
    validate_mandatory_booking_rules(booking)
    
    # 2. Re-compute dynamic pricing & verify applicable discounts
    current_fare = pricing_engine.evaluate(booking.parameters)
    if current_fare.has_drift(booking.quoted_amount):
        raise PricingDriftException("Fare expired during authorization window")
        
    # 3. Step through hierarchical approval chain
    if actor_role == Roles.SUB_ADMIN:
        booking.transition_to(BookingStatus.SUB_ADMIN_VERIFIED)
    elif actor_role == Roles.SUPER_ADMIN:
        booking.transition_to(BookingStatus.AUTHORIZED)
        invoice_service.generate_final_invoice(booking)
        
    booking.save()
    return booking.state`,
    },
  },
  {
    id: "marketplace-insights-platform",
    num: "02",
    title: "Marketplace Insights & Sync Engine",
    subtitle: "High-Frequency Amazon SP-API & Walmart Telemetry Pipeline",
    category: "DATA PIPELINES · DISTRIBUTED INTEGRATIONS",
    stack: [
      "Amazon SP-API",
      "Walmart Marketplace API",
      "Django",
      "MongoDB",
      "OAuth 2.0",
      "Background Sync",
    ],
    systemHighlights: [
      { label: "Data Model", value: "MongoDB Document Schema" },
      { label: "Auth Management", value: "Automated OAuth 2.0 Token Refresh" },
      { label: "Analytics Metric", value: "Hourly Sales & Listing Quality" },
      { label: "Telemetry", value: "Alert-Based Real-Time Insights" },
    ],
    challenge:
      "Synchronizing diverse third-party commerce APIs with distinct rate limits, authentication lifecycles, and asynchronous report schemas. The system required resilient hourly ingestion of orders, inventory adjustments, and listing quality metrics inspired by marketplace intelligence platforms without blocking client-facing dashboards.",
    architecturalSolution:
      "Constructed a background synchronization architecture in Django powered by MongoDB's flexible schemaless ingestion. Built automated OAuth 2.0 token management with pre-expiry rotation. Designed scheduled workers that ingest Amazon SP-API and Walmart feeds, compute hourly sales trends, aggregate listing quality scores, and dispatch alert-based notifications.",
    systemPipeline: [
      "SCHEDULED_TRIGGER",
      "OAUTH_TOKEN_ROTATION",
      "AMAZON_SP_API / WALMART_API",
      "RATE_LIMITED_INGESTION",
      "MONGODB_TIME_SERIES_DOCS",
      "HOURLY_METRICS_AGGREGATION",
      "INSIGHTS_DASHBOARD_API",
    ],
    capabilities: [
      "Bi-directional Synchronization with Amazon SP-API & Walmart",
      "Automated OAuth 2.0 Token Lifecycle & Refresh Rotation",
      "Listing Quality & Performance Trend Calculation (Inspired by Helium 10)",
      "Hourly Sales Aggregation & High-Speed MongoDB Queries",
      "Alerting Engine for Critical Inventory & Listing Variations",
    ],
    codeConcept: {
      filename: "tasks/marketplace_sync_worker.py",
      language: "python",
      snippet: `class MarketplaceSyncOrchestrator:
    def execute_hourly_telemetry(self, merchant_id: str, platform: str):
        # Automated OAuth token validation and refresh rotation
        credentials = oauth_manager.get_valid_token(merchant_id, platform)
        
        # Pull delta changes respecting API rate limits & backoff
        orders_feed = self.client(platform).fetch_orders(credentials, window="1h")
        inventory_feed = self.client(platform).fetch_inventory(credentials)
        
        # Batch write into MongoDB collection with upsert semantics
        mongo_db.marketplace_snapshots.bulk_write([
            UpdateOne(
                {"merchant_id": merchant_id, "sku": item["sku"], "hour_ts": current_hour},
                {"$set": item},
                upsert=True
            ) for item in orders_feed
        ])
        
        # Evaluate listing quality and trigger alerts if metrics breach thresholds
        insights_engine.evaluate_listing_health(merchant_id, inventory_feed)`,
    },
  },
  {
    id: "ai-document-processing",
    num: "03",
    title: "AI Document Extraction Pipeline",
    subtitle: "Automated OCR & Semantic Data Mapping for Invoices and Lease Agreements",
    category: "AI BACKEND · DOCUMENT INTELLIGENCE",
    stack: [
      "OCR Engine",
      "Python",
      "AI Extraction",
      "Data Mapping",
      "Schema Normalization",
      "Validation",
    ],
    systemHighlights: [
      { label: "Document Types", value: "Commercial Invoices & Lease Agreements" },
      { label: "Extraction Flow", value: "OCR → AI Extraction → Data Mapping" },
      { label: "Output Schema", value: "Strict Normalized Structured JSON" },
      { label: "Human Friction", value: "Eliminated Manual Entry Bottlenecks" },
    ],
    challenge:
      "Enterprise invoices and legal lease agreements vary drastically in layout, typography, scan artifacts, and nomenclature. Manual entry introduced severe operational latency and error risks when bridging unformatted physical files into financial and enterprise databases.",
    architecturalSolution:
      "Architected an end-to-end processing pipeline in Python. High-resolution documents pass through OCR pre-processing, followed by AI-driven contextual entity extraction. Intelligent heuristic data mapping layers convert arbitrary clause labels and table line items into clean, validated, schema-compliant JSON payloads ready for downstream database insertion.",
    systemPipeline: [
      "RAW_DOCUMENT_INPUT",
      "PREPROCESSING_&_OCR",
      "SEMANTIC_AI_PARSING",
      "INTELLIGENT_FIELD_MAPPING",
      "DATA_VALIDATION_RULES",
      "STRUCTURED_DATABASE_PAYLOAD",
    ],
    capabilities: [
      "Automated Optical Character Recognition (OCR) for Complex Layouts",
      "Extraction of Line Items, Due Dates, Legal Clauses & Payment Terms",
      "Intelligent Entity Mapping to Standardized Enterprise Schemas",
      "Validation against Business Rules and Data Type Boundaries",
      "Substantial Reduction in Manual Entry Overhead and Data Inaccuracy",
    ],
    codeConcept: {
      filename: "pipelines/document_parser.py",
      language: "python",
      snippet: `def extract_lease_or_invoice(file_stream: BinaryIO, doc_type: DocumentType) -> NormalizedEntity:
    # Phase 1: High-fidelity OCR extraction
    raw_ocr_tokens = ocr_engine.extract_text_and_coordinates(file_stream)
    
    # Phase 2: Contextual AI extraction using domain-tuned prompts
    extracted_fields = ai_extractor.parse_semantic_entities(
        tokens=raw_ocr_tokens,
        target_schema=doc_type.schema_definition
    )
    
    # Phase 3: Intelligent heuristic data mapping & schema normalization
    mapped_record = DataMapper.map_to_canonical(extracted_fields, doc_type)
    
    # Phase 4: Enforce strict business validation
    validated_payload = SchemaValidator.validate(mapped_record)
    return validated_payload`,
    },
  },
];
