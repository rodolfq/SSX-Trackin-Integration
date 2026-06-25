import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = 'https://integration.systemsatx.com.br';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { endpoint, method = 'POST', data, headers = {}, isFormData = false } = body;

    if (!endpoint) {
      return NextResponse.json({ error: 'Endpoint is required' }, { status: 400 });
    }

    const targetUrl = `${BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

    let fetchBody: any = undefined;
    let fetchHeaders: any = {
      'Accept': 'application/json',
      ...headers,
    };

    if (isFormData && data) {
      const form = new FormData();
      for (const key in data) {
        form.append(key, data[key]);
      }
      fetchBody = form;
    } else {
      fetchHeaders['Content-Type'] = 'application/json';
      if (data) fetchBody = JSON.stringify(data);
    }

    const response = await fetch(targetUrl, {
      method,
      headers: fetchHeaders,
      body: fetchBody,
    });

    const responseText = await response.text();
    let responseData;
    
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      responseData = responseText;
    }

    return NextResponse.json(
      { 
        status: response.status, 
        data: responseData,
        headers: Object.fromEntries(response.headers.entries()),
      },
      { status: 200 } // Always return 200 to the client, let them handle the wrapped status
    );
  } catch (error: any) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to proxy request', details: error.message },
      { status: 500 }
    );
  }
}
