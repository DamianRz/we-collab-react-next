// routes
export const USER_ROUTE: string = '/user';
// GET /user -> Obtiene todas
// GET /user -> /{id_user}
// POST /user
// PUT /user 
// DELETE /user -> /{id_user}
export const USER_SIGN_IN_ROUTE: string = `${USER_ROUTE}/v1/login`;
export const USER_EXISTS_ROUTE: string = `${USER_ROUTE}/email`;

export const BARBER_ROUTE: string = '/barber';
// GET /barber -> Obtiene todas
// GET /barber -> /{id_user}
// POST /barber
// PUT /barber 
// DELETE /barber -> /{id_user}
export const RESERVE_ROUTE: string = '/reserve';
export const RESERVE_DATES_ROUTE: string = `${RESERVE_ROUTE}/v1/t/barber`;
// GET /reserve -> Obtiene todas 
// GET /reserve -> /{id_reserve}
// GET /reserve -> /client/{client_id}
// GET /reserve -> /barber/{barb_or_hair_id}

// POST /reserve -> /create/{id_client}
// PUT /reserve  -> /update
// PUT /reserve  -> /client/{id_client}/cancel/{id_reserve}
// DELETE /reserve -> /user/{id_barber_or_hair}/reserve/{id_reserve}
export const CLIENT_ROUTE: string = `/client`;
export const CLIENT_EXISTS_ROUTE: string = `${CLIENT_ROUTE}/email`;
// GET /client -> Obtiene todas
// GET /client -> /{id_client}
// POST /client
// PUT /client 
// DELETE /client -> /{id_client}

// endpoints
export const GET_ENDPOIT: string = 'get';
export const PATCH_ENDPOIT: string = 'patch';
export const POST_ENDPOIT: string = 'post';
export const PUT_ENDPOIT: string = 'put';
export const DELETE_ENDPOIT: string = 'delete'; 