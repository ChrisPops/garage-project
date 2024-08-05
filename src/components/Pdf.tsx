import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

// Puts price in US style.
function processPrice(price: number) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }) as any;
  return formatter.format(price)
};

// Processes title Length to avoid overlap.
function processLongTitle(title: string) {
  const maxTitle = 50 as number;
   if (title.length < maxTitle) {
    return title;
  } 
  return title.slice(0,maxTitle) + '...';
};

interface CompProps {
  listingTitle?: any;
  sellingPrice?: any;
  isShippable?: boolean;
  id?: string;
};


export const Pdf: React.FC<CompProps> = ({listingTitle, sellingPrice, isShippable, id}) => {
    // generates a custom PDF for download.
    async function createPdf() {
        const pdfDoc = await PDFDocument.create() as any;
        const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman) as any;
        const timesRomanBoldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold) as any;
        const page = pdfDoc.addPage() as any;
        const { height } = page.getSize() as any;
        const marginLeft = 50 as number;
        const fontSize = 16 as number;
        const brandColor = rgb(0.75, 0.2, 0.2) as object;
        const textColor = rgb(0, 0, 0) as object;
        const gridColor = rgb(.9,.9,.9) as object;
        const mainGridLength = 100 as number;
        
        page.drawLine({
          start: { x: 0, y:  height - 1 * fontSize - 5 },
          end: { x: 0 + 600, y:  height - 1 * fontSize - 5 },
          thickness: 100,
          color: brandColor
        });

        page.drawLine({
          start: { x: 0, y:  height - 4 * fontSize - 5 },
          end: { x: 0 + 600, y:  height - 4 * fontSize - 5 },
          thickness: 1,
          color: rgb(.65,.1,.1)
        });

        page.drawText('PRODUCT INVOICE', {
          x: marginLeft,
          y: height - 3 * fontSize + 2,
          size: fontSize * 2,
          font: timesRomanFont,
          color: rgb(1,1,1)
        });

        page.drawText('ID:', {
          x: marginLeft,
          y: height - 7 * fontSize,
          size: fontSize,
          font: timesRomanBoldFont,
          color: textColor
        });

        page.drawText(id, {
          x: marginLeft + mainGridLength,
          y: height - 7 * fontSize,
          size: fontSize,
          font: timesRomanFont,
          color: textColor
        });

        page.drawLine({
          start: { x: marginLeft, y:  height - 7 * fontSize - 10 },
          end: { x: marginLeft + 520, y:  height - 7 * fontSize - 10 },
          thickness: 1,
          color: gridColor
        });

        page.drawText('Item:', {
          x: marginLeft,
          y: height - 9 * fontSize,
          size: fontSize,
          font: timesRomanBoldFont,
          color: textColor
        });


        page.drawText(processLongTitle(listingTitle), {
          x: marginLeft + mainGridLength,
          y: height - 9 * fontSize,
          size: fontSize,
          font: timesRomanFont,
          color: textColor
        });
        page.drawLine({
          start: { x: marginLeft, y:  height - 9 * fontSize - 10 },
          end: { x: marginLeft + 520, y:  height - 9 * fontSize - 10 },
          thickness: 1,
          color: gridColor
        });

        page.drawLine({
          start: { x: marginLeft + 75, y:  height - 5 * fontSize - 10 },
          end: { x: marginLeft + 75, y:  height - 11 * fontSize - 10 },
          thickness: 1,
          color: gridColor
        });


        page.drawText('Subtotal:', {
          x: marginLeft,
          y: height - 11 * fontSize,
          size: fontSize,
          font: timesRomanBoldFont,
          color: textColor
        });

        const feesNote = (isShippable === true ? '': ' Extra freight and transportation fees may apply.');

        page.drawText(processPrice(sellingPrice) + feesNote, {
          x: marginLeft + mainGridLength,
          y: height - 11 * fontSize,
          size: fontSize,
          font: timesRomanFont,
          color: textColor
        });

        page.drawText('Payable To:', {
          x: marginLeft,
          y: height - 17 * fontSize,
          size: fontSize,
          font: timesRomanBoldFont,
          color: textColor
        });

        page.drawText('WithGarage', {
          x: marginLeft + mainGridLength,
          y: height - 17 * fontSize,
          size: fontSize,
          font: timesRomanFont,
          color: textColor
        });

        page.drawText('123 Main Street', {
          x: marginLeft + mainGridLength,
          y: height - 18 * fontSize,
          size: fontSize,
          font: timesRomanFont,
          color: textColor
        });
        
        page.drawText('Anytown, USA 11219', {
          x: marginLeft + mainGridLength,
          y: height - 19 * fontSize,
          size: fontSize,
          font: timesRomanFont,
          color: textColor
        });

        page.drawText('Payment Terms:', {
          x: marginLeft,
          y: height - 21 * fontSize,
          size: fontSize,
          font: timesRomanBoldFont,
          color: textColor
        });

        page.drawText('Due within 30 days of ' + new Date().toJSON().slice(0, 10) + '.', {
          x: marginLeft + 125,
          y: height - 21 * fontSize,
          size: fontSize,
          font: timesRomanFont,
          color: textColor
        });

        page.drawText('Thank you for your business!', {
          x: marginLeft,
          y: height - 25 * fontSize,
          size: fontSize,
          font: timesRomanFont,
          color: textColor
        });

        //const pdfBytes = await pdfDoc.save() as any;
        const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
        let iframe = document.getElementById('pdf')! as  HTMLIFrameElement | null;;
        iframe!.src = pdfDataUri;


    };
    createPdf();
    return (
        <>
           <iframe 
                title="frame"
                height="500px"
                id="pdf"
                className="w-full"
                src={''} />
        </>
    );
};