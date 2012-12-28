-29--c-3-.logo-builder
======================

This small piece of software generates text and writes it to pdf.
Checkout http://events.ccc.de/congress/2012/wiki/Propaganda

Dependencies
=============

- https://github.com/devongovett/pdfkit
- https://github.com/substack/node-optimist

TO DO
=====

- Add more patterns (see ccc link above under "Scrambled Names")
- Optimize pdf output
	- At the moment the pdfkit library is not able to set a background for a page (I did not find anything about this), so I just used a oversized rectangle as background. This could be done a bit more effective. 