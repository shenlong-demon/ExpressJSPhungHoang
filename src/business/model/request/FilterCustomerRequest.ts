import {BaseFilter} from "@business/model/request/BaseFilter";

export type FilterCustomerRequest = BaseFilter &  {
    nameOrNickName?: string;
    status?: string;
}
