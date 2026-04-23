import React from 'react';
import type { Invoice } from '../types';

interface PrintableInvoiceProps {
  invoice: Invoice;
  lang: string;
  chaletName?: string;
  licenseNumber?: string;
  adminName?: string;
  balanceDue?: number;
  depositUnpaid?: boolean;
}

const NAVY = '#011F36';
const GOLD = '#D4AF37';
const MUTED = '#6b7280';
const BORDER = '#e5e7eb';

const localizeDesc = (desc: string, isAr: boolean, property: string): string => {
  if (!isAr) return desc;
  if (/[؀-ۿ]/.test(desc)) return desc;
  if (/refundable\s*security\s*deposit/i.test(desc)) return 'مبلغ التأمين المسترد';
  if (/full\s*day|day\s*use/i.test(desc)) return `يوم كامل بدون مبيت — ${property}`;
  if (/partial/i.test(desc)) return `حجز جزئي — ${property}`;
  if (/morning/i.test(desc)) return `فترة صباحية — ${property}`;
  if (/afternoon|evening/i.test(desc)) return `فترة مسائية — ${property}`;
  const nightMatch = desc.match(/^(\d+)\s*nights?\s*[—–-]/i);
  if (nightMatch) {
    const n = parseInt(nightMatch[1], 10);
    return `${n} ${n > 1 ? 'ليالٍ' : 'ليلة'} — ${property}`;
  }
  const slotMatch = desc.match(/^(.+?)\s*[—–-]\s*.+$/);
  if (slotMatch) return `${slotMatch[1]} — ${property}`;
  return desc;
};

export const PrintableInvoice: React.FC<PrintableInvoiceProps> = ({
  invoice,
  lang,
  chaletName,
  licenseNumber,
  adminName,
  balanceDue,
  depositUnpaid,
}) => {
  const isAr = lang === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';
  const refId = invoice.id.slice(0, 8).toUpperCase();
  const property = isAr ? 'شاليه الملاك' : invoice.room_type;
  const company = (chaletName || (isAr ? 'شاليه الملاك' : 'Al Malak Chalet')).toUpperCase();

  const dateLocale = isAr ? 'ar-OM' : 'en-GB';
  const dateStr = new Date(invoice.issued_date).toLocaleDateString(dateLocale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const t = {
    invoice: isAr ? 'فاتورة' : 'INVOICE',
    billedTo: isAr ? 'فاتورة إلى' : 'BILLED TO',
    issueDate: isAr ? 'تاريخ الإصدار' : 'ISSUE DATE',
    reference: isAr ? 'المرجع' : 'REFERENCE',
    issuedBy: isAr ? 'صادرة بواسطة' : 'ISSUED BY',
    description: isAr ? 'البيان' : 'DESCRIPTION',
    amount: isAr ? 'المبلغ' : 'AMOUNT',
    grandTotal: isAr ? 'الإجمالي العام' : 'GRAND TOTAL',
    currency: isAr ? 'ر.ع.' : 'OMR',
    location: isAr ? 'مسقط، سلطنة عُمان' : 'Muscat, Sultanate of Oman',
    license: isAr ? 'رقم الترخيص' : 'License No.',
    depositDue: isAr ? 'مبلغ التأمين مستحق عند الوصول' : 'Deposit Due on Arrival',
    depositDueMsg: isAr
      ? 'يُحصَّل الرصيد المتبقي عند تسجيل الدخول.'
      : 'Remaining balance to be collected at check-in.',
    footer: isAr
      ? 'شكراً لاختياركم شاليه الملاك  •  فاتورة صادرة آلياً ولا تتطلب توقيعاً'
      : 'Thank you for choosing Al Malak Chalet  •  This is a computer-generated invoice.',
  };

  const fmt = (n: number) => n.toLocaleString(isAr ? 'ar-OM' : 'en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="printable-invoice" dir={dir} lang={isAr ? 'ar' : 'en'}>
      <div className="pi-sheet">
        {/* Header band */}
        <header className="pi-header">
          <div className="pi-header-inner">
            <div className="pi-brand">
              <div className="pi-brand-mark">AM</div>
              <div>
                <div className="pi-brand-name">{company}</div>
                <div className="pi-brand-tag">{t.location}</div>
                {licenseNumber && (
                  <div className="pi-brand-tag">{t.license}: {licenseNumber}</div>
                )}
              </div>
            </div>
            <div className="pi-title-block">
              <div className="pi-title">{t.invoice}</div>
              <div className="pi-ref">#{refId}</div>
            </div>
          </div>
          <div className="pi-header-accent" />
        </header>

        {/* Meta grid */}
        <section className="pi-meta">
          <div className="pi-meta-col">
            <div className="pi-meta-label">{t.billedTo}</div>
            <div className="pi-meta-name">{invoice.guest_name}</div>
            <div className="pi-meta-sub">{property}</div>
          </div>
          <div className="pi-meta-col">
            <div className="pi-meta-label">{t.issueDate}</div>
            <div className="pi-meta-value">{dateStr}</div>
            {adminName && (
              <>
                <div className="pi-meta-label pi-meta-label-sm">{t.issuedBy}</div>
                <div className="pi-meta-sub">{adminName}</div>
              </>
            )}
          </div>
        </section>

        {/* Line items table */}
        <section className="pi-table-wrap">
          <div className="pi-table-head">
            <span>{t.description}</span>
            <span>{t.amount} ({t.currency})</span>
          </div>
          {invoice.items && invoice.items.length > 0 ? (
            invoice.items.map((item, i) => {
              const isDeposit = /deposit|تأمين/i.test(item.description);
              return (
                <div key={i} className={`pi-row ${isDeposit ? 'pi-row-muted' : ''}`}>
                  <span>{localizeDesc(item.description, isAr, property)}</span>
                  <span className="pi-row-amount">{fmt(item.amount)}</span>
                </div>
              );
            })
          ) : (
            <div className="pi-row">
              <span>{isAr ? `رسوم الإقامة — ${property}` : `Stay Charges — ${invoice.room_type}`}</span>
              <span className="pi-row-amount">{fmt(invoice.subtotal)}</span>
            </div>
          )}
        </section>

        {/* Grand total */}
        <section className="pi-total">
          <span className="pi-total-label">{t.grandTotal}</span>
          <span className="pi-total-value">
            {fmt(invoice.total_amount)} <span className="pi-total-currency">{t.currency}</span>
          </span>
        </section>

        {/* Deposit notice */}
        {depositUnpaid && balanceDue && balanceDue > 0 && (
          <section className="pi-notice">
            <div className="pi-notice-title">{t.depositDue}</div>
            <div className="pi-notice-body">
              {t.depositDueMsg} ({fmt(balanceDue)} {t.currency})
            </div>
          </section>
        )}

        <footer className="pi-footer">
          <div className="pi-footer-rule" />
          <div className="pi-footer-text">{t.footer}</div>
        </footer>
      </div>
    </div>
  );
};
