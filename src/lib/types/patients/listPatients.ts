import type { Patient } from "../patient";
import type { BaseResponse } from "../api";

export interface ListPatientsResponse extends BaseResponse<{
    patients: Patient[];
}> { }
