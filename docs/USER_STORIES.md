# ProcureAI - User Stories

## Priority 1-5: Core Document Management

1. **Document Upload** *(Priority: 1)*
   - As a procurement officer, I want to upload procurement-related documents (e.g., proposals, contracts) into a centralized system so that I have a single place to store and retrieve them.
   - *Integration*: Document repositories (e.g., GovCMS-based DMS), Shared drives, S3 or on-prem equivalent, Single Sign-On (myGovID / Azure AD).

2. **Automatic Document Classification** *(Priority: 2)*
   - As a procurement officer, I want the system to automatically detect whether an uploaded document is a proposal, contract, or invoice so that I can quickly organize and filter documents by type.
   - *Integration*: Local classification services, Vision-Agent pipeline, AusTender attachments if available.

3. **Key Field Extraction** *(Priority: 3)*
   - As a procurement officer, I want to automatically extract key fields (e.g., vendor name, total bid amount, submission date) from proposals so that I can compare vendor information without reading each document in detail.
   - *Integration*: OCR engine (Tesseract/Azure/AWS), Structured data store, Potential integration with eTendering portals.

4. **Data Correction Interface** *(Priority: 4)*
   - As a procurement officer, I want to see the extracted data in a simple interface and correct any mistakes so that the system can learn from corrections and improve accuracy over time.
   - *Integration*: Web UI built on GovCMS or internal portal, Database for storing and updating corrected info.

5. **Compliance Checking** *(Priority: 5)*
   - As a compliance manager, I want the system to highlight missing mandatory forms or attachments so that I can quickly flag incomplete bids before they move on in the review process.
   - *Integration*: Document checklists (specific to AusTender requirements), Integration with internal compliance databases (e.g., Risk & Compliance Tools).

## Priority 6-10: Search and Analysis

6. **Document Search** *(Priority: 6)*
   - As a procurement officer, I want to search for documents by vendor name or bid ID so that I can quickly locate relevant procurement files.
   - *Integration*: Search engine (e.g., Elasticsearch), Integration with AusTender reference numbers or internal vendor registry.

7. **Processing Dashboard** *(Priority: 7)*
   - As a contracting manager, I want a dashboard showing the status of each uploaded document (classified or not, extracted data present or not) so that I can track progress at a glance.
   - *Integration*: Internal reporting platform, GovCMS-based dashboard, or Power BI with secure Gov tenancy.

8. **OCR Processing** *(Priority: 8)*
   - As a procurement officer, I want the system to run OCR on scanned documents so that I can extract and search text from paper-based proposals and contracts.
   - *Integration*: OCR engine (Tesseract, AWS Textract, Azure OCR), Possibly scanning hardware integration.

9. **Document Summarization** *(Priority: 9)*
   - As an evaluation committee member, I want to see a concise summary of a large proposal so that I can rapidly assess the main points without reading every page.
   - *Integration*: Vision-Agent summarization modules, Large Language Model support (on secure Gov environment).

10. **Clause Identification** *(Priority: 10)*
    - As a legal advisor, I want the system to automatically identify key clauses (e.g., payment terms, termination conditions) in contracts so that I can verify compliance with our standard contractual requirements.
    - *Integration*: Clause extraction models, reference to whole-of-government contract templates, legal knowledge bases.

## Priority 11-15: Workflow and Comparison

11. **Mandatory Clause Checking** *(Priority: 11)*
    - As a compliance manager, I want to configure a list of mandatory sections, disclaimers, and legal statements so that the system can alert me if any required clause is missing in a contract draft.
    - *Integration*: Configurable rules engine, references to relevant Australian legal/regulatory frameworks (e.g., PGPA Act).

12. **Role-Based Access Control** *(Priority: 12)*
    - As an IT administrator, I want to define user roles (procurement officer, legal, finance) so that each user only sees and edits information relevant to their role.
    - *Integration*: Integration with government identity and access management (myGovID, Azure AD), role-based access control framework.

13. **Document Routing** *(Priority: 13)*
    - As a procurement officer, I want to route documents for internal approvals (legal, finance) so that the right people can review and sign off at each stage of the procurement process.
    - *Integration*: Workflow engine (e.g., Camunda, Nintex), integration with email/SMS notifications within Gov networks.

14. **Version Control** *(Priority: 14)*
    - As a legal advisor, I want to track different versions of a contract so that I can compare changes made over the negotiation period and maintain a clear revision history.
    - *Integration*: Version control in DMS (e.g., GovCMS or SharePoint), integration with eSignature solutions if applicable.

15. **Template Comparison** *(Priority: 15)*
    - As a contracting officer, I want to compare the uploaded contract to a standard template so that I can quickly spot deviations from our default clauses or terms.
    - *Integration*: Clause mapping and difference-checking tool, reference library of official Australian Government contract templates.

## Priority 16-20: Finance and Audit

16. **Invoice Matching** *(Priority: 16)*
    - As a finance officer, I want the system to parse invoices from awarded vendors and match them against contract line items so that I can flag discrepancies in pricing or deliverables automatically.
    - *Integration*: Financial systems (SAP, TechnologyOne, Oracle), referencing contract details for line items.

17. **Risk Scoring** *(Priority: 17)*
    - As a procurement manager, I want an AI-based risk score for each proposal based on factors like vendor history or missing documentation so that I can prioritize high-risk proposals for deeper review.
    - *Integration*: Analytics platform (Power BI, Qlik, etc.), historical vendor performance data, AusTender performance references.

18. **Document Collaboration** *(Priority: 18)*
    - As a procurement team member, I want to leave comments or notes on specific documents or extracted fields so that I can communicate feedback and questions to colleagues within the system.
    - *Integration*: Collaboration platform (Teams or Gov Intranet), database for storing notes linked to documents.

19. **E-Tender Import** *(Priority: 19)*
    - As an IT administrator, I want the system to automatically import bids from our e-procurement portal so that new submissions are analyzed without manual file uploads.
    - *Integration*: AusTender or state eTendering portals, secure API integration.

20. **Audit Logging** *(Priority: 20)*
    - As a compliance auditor, I want a detailed log of every upload, edit, and review action so that I can demonstrate compliance and trace any changes for legal or policy reasons.
    - *Integration*: Audit trail logging, SIEM integration (e.g., Splunk), alignment with Protective Security Policy Framework (PSPF).

## Priority 21-28: Advanced Features and Integration

21. **Procurement Analytics** *(Priority: 21)*
    - As an executive sponsor, I want to see reports on the number of bids processed, average review time, and percentage of compliance failures so that I can measure productivity and identify areas for improvement.
    - *Integration*: BI/Reporting (Power BI, Tableau), data warehouse integration, secure Gov environment hosting.

22. **Natural Language Queries** *(Priority: 22)*
    - As a procurement officer, I want to ask the system questions (e.g., 'What is the total cost in Vendor X's proposal?') so that I can get immediate answers without manually searching.
    - *Integration*: LLM Q&A module (secure deployment), indexing of text for quick retrieval.

23. **Automated Invoice Approval** *(Priority: 23)*
    - As a finance manager, I want the system to automatically approve invoices that match contract terms within a certain variance so that only exceptions are forwarded for manual review.
    - *Integration*: Financial ERP system (SAP, Oracle), rules engine for auto-approval thresholds, eInvoicing standards for Australian Government.

24. **Predictive Vendor Performance** *(Priority: 24)*
    - As a procurement manager, I want a feature that uses historical data to rank proposals' likelihood of on-time, on-budget delivery so that I can make more data-driven vendor selections.
    - *Integration*: Machine learning models, data from past Gov contracts, references to vendor performance metrics.

25. **Executive Dashboards** *(Priority: 25)*
    - As a C-level executive, I want interactive dashboards that show trends in contract spending, vendor performance, and time-to-award so that I can make strategic decisions and see ROI of our procurement process.
    - *Integration*: Enterprise BI tools, integration with finance and performance data, Gov-level data analytics frameworks.

26. **Contract Renewal Alerts** *(Priority: 26)*
    - As a contract manager, I want alerts when a contract is nearing its renewal or expiration date so that I can proactively negotiate or renew with the vendor without delays.
    - *Integration*: Calendar/alerting system (Outlook 365 or Teams notifications), DMS or contract lifecycle management system.

27. **Regulatory Compliance Updates** *(Priority: 27)*
    - As a legal advisor, I want the system to highlight any newly mandated policy or regulatory changes that might affect existing contracts so that I can update them and remain compliant.
    - *Integration*: Regulatory monitoring service, Government Gazette or legislative feed, knowledge base for new rules (e.g., updates from A-G's Department).

28. **Negotiation Intelligence** *(Priority: 28)*
    - As a lead negotiator, I want the system to suggest negotiation angles or highlight terms that can be improved based on historical contracts so that I can optimize final contract outcomes with minimal effort.
    - *Integration*: Advanced ML/LLM approach, large dataset of historical negotiations, integrated with contract templates and outcomes.