# br-nlp: Blu-Ray.com Review Summarizer

## Overview

**br-nlp** is a Chrome extension designed to summarize lengthy blu-ray movie reviews. By leveraging the power of generative AI, this extension condenses detailed reviews from Blu-Ray.com, saving users time while preserving the essence of the review. This extension is particularly useful for movie enthusiasts who want a quick overview of a movie without having to read through a lengthy review.

## Features

- **Automated Review Extraction**: Identifies and extracts relevant review sections from review pages.
- **Generative AI-Powered Summarization**: Utilizes an API to generate high-quality, concise summaries.
- **User-Friendly Interface**: Displays summarized reviews directly in the extension popup.

## How It Works

1. The extension scans review sections of a Blu-Ray.com review webpage.
2. Extracted text is cleaned and processed before it is sent to the API for summarization.
3. The summarized content is displayed in the extension popup.

## Installation

1. Clone or download this repository to your local machine.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** by toggling the switch in the top-right corner.
4. Click on **Load unpacked** and select the folder containing this extension's files.
5. The extension will now appear in the Chrome toolbar.

## Usage

1. Visit a webpage on Blu-Ray.com.
2. Click on the extension icon in the browser toolbar.
3. In the popup window, click the **Summarize Review** button.
4. Wait a few seconds as the API processes the review.
5. The summarized review will appear in the popup interface.

## File Structure

- `manifest.json`: Defines the configuration and permissions required by the Chrome extension.
- `src/background.js`: Manages communication with the API and processes summarization requests.
- `src/popup.html`: Provides the user interface for interacting with the extension.
- `src/popup.js`: Handles user interactions and cleans review text from web pages.

## Notes

- Ensure you are on a valid Blu-Ray.com review page before using the extension.
- The quality of summaries depend on both the extracted text and generative AI model.
- It is possible to use a different generative AI model.

## Future Enhancements

We aim to improve this project in the future by adding:
- Customizable summary lengths (e.g., short, medium, detailed).
- Enhanced extension UI to improve user experience.