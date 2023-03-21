import { Overrides } from '../config';
import {
  Calendar,
  CalendarSchema,
  DestroyCalendarQueryParams,
  ListCalenderParams,
} from '../schema/calendars';
import { ListResponse, Response } from '../schema/response';
import { BaseResource } from './baseResource';

interface FindCalendarParams {
  calendarId: string;
  grantId: string;
}
interface ListCalendersParams {
  grantId: string;
  queryParams: ListCalenderParams;
}

interface DestroyCalendarParams {
  grantId: string;
  eventId: string;
  queryParams: DestroyCalendarQueryParams;
}

export class Calendars extends BaseResource {
  public async find({
    calendarId,
    grantId,
    overrides,
  }: FindCalendarParams & Overrides): Promise<Response<Calendar>> {
    const res = await this.apiClient.request<Response<Calendar>>(
      {
        method: 'GET',
        path: `/v3/grants/${grantId}/calendars/${calendarId}`,
        overrides,
      },
      {
        responseSchemaToValidate: CalendarSchema,
      }
    );

    return res;
  }

  public async list({
    grantId,
    queryParams,
    overrides,
  }: ListCalendersParams & Overrides): Promise<ListResponse<Calendar>> {
    const res = await this.apiClient.request<ListResponse<Calendar>>(
      {
        method: 'GET',
        path: `/v3/grants/${grantId}/calendars`,
        queryParams,
        overrides,
      },
      {
        responseSchemaToValidate: CalendarSchema,
      }
    );

    return res;
  }

  public async create(): Promise<Response<Calendar>> {
    throw new Error('Not implemented');
  }

  public async update(): Promise<Response<Calendar>> {
    throw new Error('Not implemented');
  }

  public async destroy({
    grantId,
    eventId,
    queryParams,
    overrides,
  }: DestroyCalendarParams & Overrides): Promise<null> {
    const res = await this.apiClient.request<null>(
      {
        method: 'DELETE',
        path: `/v3/grants/${grantId}/events/${eventId}`,
        queryParams,
        overrides,
      },
      {}
    );

    return res;
  }
}
