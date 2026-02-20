import type { BaseResponse } from "../api";
import type { Psychologist } from "../psychologist";

export interface ListPsychologistProfilesResponse extends BaseResponse<{
    psychologists: Psychologist[];
}> { }