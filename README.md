# Have I Been Pwned MV

This lightweight, browser-based tool helps users in the Maldives understand whether platforms they rely on have had known bugs and when those bugs were patched.

## Todo

- create link preview
- add dhiv lang and rtl support

## Features

- Clean, responsive interface for breach checking
- Comprehensive breach database with detailed information
- Fast search and filtering capabilities
- Mobile-friendly design
- Static site generation for optimal performance

## Tech Stack

- **Next.js 15** - React framework with static export
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **GitHub Pages** - Static hosting

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm, yarn, pnpm, or bun

## Data Management

All breach data is stored in the `breachData.ts` file. This file contains comprehensive information about various data breaches including:

- Breach names and descriptions
- Affected user counts
- Breach dates
- Company logos and details
- Data types compromised

### Updating Breach Information

We welcome contributions to keep the breach database current and accurate. You can help by:

1. **Submit a Pull Request**: Fork the repository, update the `breachData.ts` file with new or corrected information, and submit a PR
2. **Contact via Telegram**: Reach out to [@whoisfishie](https://t.me/whoisfishie) with breach updates or corrections

### Contributing Guidelines

When updating breach data, please ensure:

- Information is accurate and from reliable sources
- Follow the existing data structure in `breachData.ts`
- Include all relevant breach details
- Verify logos and company information
- Test locally before submitting

## Project Structure

```
├── src/
│   ├── app/                 # Next.js app directory
│   ├── components/          # React components
│   ├── lib/                 # Utilities and context
│   └── data/
│       └── breachData.ts    # Main breach database
├── public/
│   └── logos/              # Company logos and assets
├── .github/
│   └── workflows/          # GitHub Actions for deployment
└── next.config.js          # Next.js configuration
```

## Contact

For questions, suggestions, or breach data updates:

- **Telegram**: [@whoisfishie](https://t.me/whoisfishie)
- **GitHub Issues**: Open an issue for bugs or feature requests
- **Pull Requests**: Contribute directly to improve the project

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Inspired by Troy Hunt's [Have I Been Pwned](https://haveibeenpwned.com/) service
- Built with modern web technologies for optimal performance
- Community-driven breach database maintenance
