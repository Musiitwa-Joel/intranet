# Email Template Integration Guide

This guide explains how to integrate the professional email templates with your existing Email Sender Admin interface.

## Integration Overview

The integration allows you to:
1. Keep your existing three-tab structure (Compose Email, Email History, and Templates)
2. Add professional email templates to your template selection dropdown
3. Preview and use both standard and professional templates
4. Maintain all existing functionality

## Key Components

1. **EmailSenderWithTemplates.jsx**: The main component that replaces your existing EmailSenderAdmin component
2. **EmailTemplateRegistry.js**: A catalog of all available professional templates
3. **Professional Template Components**: The React components for each template type

## How It Works

### Template Types

The integration distinguishes between two types of templates:
- **Standard Templates**: Your existing templates with HTML content
- **Professional Templates**: The new React component-based templates

### Template Selection

When a user selects a template:
- If it's a standard template, it uses the existing behavior (HTML content in ReactQuill)
- If it's a professional template, it renders the React component directly

### Preview

The preview modal handles both types of templates:
- For standard templates, it displays the HTML content
- For professional templates, it renders the React component with the form values

## Implementation Steps

1. **Copy Files**:
   - Copy all professional template components to your project
   - Add the EmailTemplateRegistry.js file
   - Add the EmailSenderWithTemplates.jsx file (or modify your existing component)

2. **Replace Component**:
   - Replace your existing EmailSenderAdmin component with EmailSenderWithTemplates
   - Or modify your existing component following the patterns in EmailSenderWithTemplates

3. **Update Imports**:
   - Make sure all template components are properly imported
   - Update any import paths as needed for your project structure

## Template Variables

Professional templates use variables from your form:
- recipient_name/studentName/userName: From the recipientName field
- program: From the program field
- subject/announcement_title: From the subject field
- announcement_content: From the message field
- dueDate and paymentMethods: From their respective fields

## Customization

You can customize the integration by:
- Adding more template variables to the form
- Modifying the template preview container
- Changing how templates are categorized in the dropdown
- Adding template-specific form fields that appear only when certain templates are selected

