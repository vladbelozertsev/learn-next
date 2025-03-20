import { DocumentPickerResponse } from 'react-native-document-picker';
import { getFilesBlob } from 'src/utils/get-files-blob';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { delkeys } from 'src/utils/helpers';
import { keys } from 'src/utils/keys';
import { Asset } from 'react-native-image-picker';

export type Air = {
  DepartureAirport_ID?: string | undefined;
  ArrivalAirport_ID?: string;
};

export type Basic = {
  Transport: string;
  TransType: string;
  DepartureCountry: string;
  DepartureCity: string;
  DepartureAddress?: string;
  DepartureReadyDate: string;
  DateClose: string;
  ArrivalCountry: string;
  ArrivalCity: string;
  ArrivalAddress?: string;
  HScode?: string;
  CustomsClearance: string;
  CustomsClearanceAddress?: string; // Required if the "CustomsClearance" is "1"
  DangerSubClass?: string;
  DangerClass?: string;
  DeliveryConditions?: string;
  Notes?: string;
  ForbiddenCountries?: string[];
  files?: (DocumentPickerResponse | Asset)[];
};

export type Cargo = {
  Cargo: {
    Goods: string;
    Packing: string;
    Quantity: number;
    Weight: number;
    Width?: number;
    Length?: number;
    Height?: number;
  }[];
};

export type Road = {
  LoadingType?: string;
  TruckID?: string;
  TruckCount?: number;
  LoadMode?: string;
  MinTemperature?: string; // Required if "TruckID" is set to ref82 or ref86
  MaxTemperature?: string; // Required if "TruckID" is set to ref82 or ref86
};

export type Train = {
  TrainID?: string;
  WagonOwnership?: string;
  WagonCount?: number;
};

export type Ship = {
  ContainerID?: string;
  DeparturePort_ID?: string;
  ArrivalPort_ID?: string;
  ContainerCount?: number;
};

export type AddNewLoadForm = Air & Basic & Cargo & Road & Train & Ship;

export const useAddNewLoad = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (prams: { form: AddNewLoadForm; controller?: AbortController }) => {
      const files = getFilesBlob({ files: prams.form?.files, numbered: 'File' });
      const FilesCount = Object.keys(files || {}).length;
      const DataJson = delkeys(prams.form, ['files']);
      const send = { DataJson, FilesCount, ...files };
      await axios.post('loads', send);
      await queryClient.invalidateQueries({ queryKey: keys.loads('0') });
      await queryClient.invalidateQueries({ queryKey: keys.loads('3') });
    },
  });
};
