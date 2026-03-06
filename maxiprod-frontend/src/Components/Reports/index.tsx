import pdfmake from "pdfmake/build/pdfmake";
import pdfFonts from "../../assets/vfs_fonts.ts";
pdfmake.vfs = pdfFonts;

interface PDFReportData {
    orientation: 'portrait' | 'landscape',
    reportTitle: string,
    store: BaseDatagridStore
    filters?: () => string
}

import dayjs from 'dayjs';
import { get, isFunction, toString } from 'lodash';
import pdfMake from "pdfmake/build/pdfmake";
import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { booleanSelectOptions } from '../../Commons/selectOptions.ts';
import { Printer } from '../Icons';
import BaseDatagridStore from '../Stores/BaseDatagridStore';

const PDFReport = (props: PDFReportData) => {
    const { store, reportTitle, orientation, filters } = props
    const filtersString = isFunction(filters) ? filters() : ''

    const reportLayout: TDocumentDefinitions = GetReportLayout(
        orientation,
        reportTitle,
        store,
        'Administrador',
        filtersString
    )

    return (
        <Printer
            onClick={() => pdfMake.createPdf(reportLayout).open()}
        />
    )

};

export default PDFReport

function GetReportLayout(
    orientation: 'portrait' | 'landscape',
    reportTitle: string,
    store: BaseDatagridStore,
    responsible: string,
    stringFilters?: string,
): TDocumentDefinitions {
    const gridWidth = store.columns.reduce((sum, item) => sum + (item.width || 0), 0);
    const contentWidth = (orientation == 'portrait' ? 595.28 : 841.89) - 80;

    let calculatedWidths: (number | 'auto' | string)[] = store.columns.map(x => {
        if (x.width == null) return 'auto';
        return (x.width * contentWidth) / gridWidth;
    });

    calculatedWidths = calculatedWidths.map(x => {
        if (typeof x !== 'number') return '*';
        return `${(x * 100) / contentWidth}%`;
    });

    return {
        pageSize: 'A4',
        pageOrientation: orientation,
        content: [
            {
                columns: [
                    {
                        marginTop: -20,
                        image: 'logo',
                        width: 80,
                        height: 80,
                    },
                    {
                        type: 'none',
                        ul: [
                            { text: 'ERP Maxiprod', style: 'header' },
                            { text: 'Porto Alegre - RS', style: 'semiHeader' },
                            { text: 'Av. Carlos Gomes, 1.000', style: 'semiHeader' },
                        ]
                    },
                    {
                        marginTop: -5,
                        style: 'tableExample',
                        table: {
                            body: [
                                [{ text: 'Emissão:', style: 'infoHeader' }, { text: dayjs().format('DD/MM/YYYY HH:mm'), style: 'semiHeader' }],
                                [{ text: 'Responsável:', style: 'infoHeader' }, { text: responsible, style: 'semiHeader' }],
                                [{ text: 'Filtros:', style: 'infoHeader' }, { text: stringFilters, style: 'semiHeader' }]
                            ]
                        },
                        layout: 'noBorders'
                    }
                ]
            },
            {
                text: reportTitle,
                style: 'reportHeader',
                alignment: 'center',
                marginTop: -15,
            },
            {
                svg: `
                  <svg width="${contentWidth}" height="2">
                    <line x1="0" y1="0" x2="${contentWidth}" y2="0" stroke="#014536'" stroke-width="2" />
                  </svg>
                `,
                width: contentWidth,
                height: 2,
            },
            {
                style: 'template',
                margin: [0, 5, 0, 15],
                table: {
                    headerRows: 1,
                    widths: calculatedWidths,
                    body: [
                        [
                            ...store.columns.map((x) => ({
                                text: x.header,
                                style: 'header',
                                alignment: 'center',
                            })),
                        ],
                        ...store.data.map((row) => {
                            return store.columns.map((column) => {
                                const value = get(row, column.accessor);
                                let newValue;

                                if (typeof (value) === 'boolean') {
                                    newValue = booleanSelectOptions[toString(value)];
                                } else if (isFunction(column.value)) {
                                    newValue = column.value(value)
                                } else {
                                    newValue = toString(value);
                                }
                                return ({
                                    text: newValue,
                                    style: 'semiHeader',
                                    alignment: column.alignment
                                });
                            });
                        }),
                    ],
                },
                layout: 'lightHorizontalLines'
            },
        ],
        styles: {
            template: {
                margin: [0, 5, 0, 15]
            },
            header: {
                bold: true,
                fontSize: 13,
                color: 'black',
            },
            reportHeader: {
                bold: true,
                fontSize: 18,
                color: 'black',
            },
            infoHeader: {
                bold: true,
                fontSize: 10,
                color: 'black',
            },
            semiHeader: {
                bold: false,
                fontSize: 10,
                color: 'black',
            }
        },
        images: {
            logo: ""
        }
    };
}
