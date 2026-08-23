#!/usr/bin/env node
'use strict';

const path = require('path');
const { ROOT } = require('../lib/paths.js');
const { printHtmlToPdf } = require('../lib/print-chrome-pdf.js');

const PRINT_HTML = path.join(ROOT, 'info', 'apresentacao-unifesp-print.html');
const OUT_PDF = path.join(ROOT, 'info', 'apresentacao-inspetor-budganja-unifesp.pdf');

printHtmlToPdf(PRINT_HTML, OUT_PDF, { timeout: 60000 });
