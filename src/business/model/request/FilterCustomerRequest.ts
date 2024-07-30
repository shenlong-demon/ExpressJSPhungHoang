import {BaseFilter} from "@business/model/request/BaseFilter";

export type FilterCustomerRequest = BaseFilter &  {
    searchText: string;
    status: number | null;
}
