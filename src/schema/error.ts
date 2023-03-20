interface NylasError {
  request_id: string;
  error: {
    type: string;
    message: string;
    provider_error: any;
  };
}

/**
 * Extended Error class for errors returned from the Nylas API
 *
 * Properties:
 * name - The description of the HTTP status code
 * message - The error message returned from the Nylas API payload
 * statusCode - The status code returned from the API call
 * type - The type of error returned from the Nylas API payload
 * stack - The Error stacktrace
 * missingFields (optional) - The fields that were missing in the call returned from the Nylas API payload
 * serverError (optional) - The error returned by the provider returned from the Nylas API payload
 */
export default class NylasApiError extends Error {
  type: string;
  requestId: string;
  providerError: any;

  constructor(apiError: NylasError) {
    super(apiError.error.message);
    this.type = apiError.error.type;
    this.requestId = apiError.request_id;
    this.providerError = apiError.error.provider_error;
  }
}

// TODO: sdk error schema?
