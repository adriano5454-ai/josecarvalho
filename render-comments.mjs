import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const allowedFields = new Set(['name', 'comment', 'service', 'approved', 'consent']);

function validatedRecords(records) {
  if (!Array.isArray(records)) {
    throw new Error('Approved comments must be a JSON array.');
  }
  if (records.length > 100) {
    throw new Error('Approved comments must contain at most 100 records.');
  }

  return records.map((record, index) => {
    const prefix = `Comment ${index + 1}`;
    if (!record || typeof record !== 'object' || Array.isArray(record)) {
      throw new Error(`${prefix} must be an object.`);
    }
    const unexpected = Object.keys(record).find(key => !allowedFields.has(key));
    if (unexpected !== undefined) {
      throw new Error(`${prefix} has an unsupported field: ${unexpected}.`);
    }
    if (record.approved !== true) {
      throw new Error(`${prefix} must have approved set to true before publication.`);
    }
    if (record.consent !== true) {
      throw new Error(`${prefix} must have consent set to true before publication.`);
    }
    if (typeof record.name !== 'string' || record.name.trim().length < 1 || record.name.trim().length > 80) {
      throw new Error(`${prefix} name must be a nonempty string of at most 80 characters.`);
    }
    if (typeof record.comment !== 'string' || record.comment.trim().length < 10 || record.comment.trim().length > 1200) {
      throw new Error(`${prefix} comment must be a string of 10 to 1200 characters.`);
    }
    if (record.service !== undefined && (typeof record.service !== 'string' || record.service.trim().length > 80)) {
      throw new Error(`${prefix} service must be a string of at most 80 characters when provided.`);
    }
    return {
      name: record.name.trim(),
      comment: record.comment.trim(),
      service: record.service?.trim() || '',
      approved: true,
      consent: true,
    };
  });
}

function escapeHTML(value) {
  return value.replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

// Every record is validated before any HTML is produced. A pending or invalid
// record fails the whole build instead of publishing an incomplete selection.
export function renderApprovedComments(records) {
  const approved = validatedRecords(records);
  if (approved.length === 0) return '';

  const cards = approved.map(({ name, comment, service }) => {
    const quote = escapeHTML(comment).replace(/\r\n|\r|\n/g, '<br>');
    const serviceLabel = service ? `<span>${escapeHTML(service)}</span>` : '';
    return `<article class="testimonial-card"><p class="testimonial-quote">${quote}</p><p class="testimonial-person"><strong>${escapeHTML(name)}</strong>${serviceLabel}</p></article>`;
  });
  return `<div class="testimonial-grid">${cards.join('')}</div>`;
}

export function readApprovedComments(path) {
  let records;
  try {
    records = JSON.parse(readFileSync(path, 'utf8'));
  } catch (error) {
    throw new Error(`Could not read approved comments JSON: ${error.message}`);
  }
  return validatedRecords(records);
}

const invokedAsCLI = process.argv[1]
  && pathToFileURL(resolve(process.argv[1])).href === import.meta.url;

if (invokedAsCLI) {
  try {
    const records = readApprovedComments(process.argv[2] || 0);
    process.stdout.write(renderApprovedComments(records));
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}
