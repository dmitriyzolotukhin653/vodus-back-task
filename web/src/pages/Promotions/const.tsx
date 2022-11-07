import { MRT_ColumnDef } from 'material-react-table';

import { Promotion } from '../../api/types';
import { getFormattedDate } from '../../utils/getFormattedDate';

export const columns: Array<MRT_ColumnDef<Partial<Promotion>>> = [
  {
    header: 'Page',
    accessorKey: 'page',
    Cell: ({ cell }) => (
      <a href={cell.getValue<string>()}>{cell.getValue<string>()}</a>
    ),
  },
  {
    header: 'Promo Title',
    accessorKey: 'promo_title',
  },
  {
    header: 'Promo Description',
    accessorKey: 'promo_description',
  },
  {
    header: 'Terms and Conditions',
    accessorKey: 'terms_and_conditions',
  },
  {
    header: 'Start Date',
    accessorKey: 'start_date',
    maxSize: 65,
    Cell: ({ cell }) => {
      const value = cell.getValue<number | string>();
      return getFormattedDate(value);
    },
  },
  {
    header: 'End Date',
    accessorKey: 'end_date',
    maxSize: 65,
    Cell: ({ cell }) => {
      const value = cell.getValue<number | string>();
      return getFormattedDate(value);
    },
  },
  {
    header: 'Image',
    accessorKey: 'image_url',
    Cell: ({ cell }) => <img src={cell.getValue<string>()} alt="Promotion image" />,
  },
];
