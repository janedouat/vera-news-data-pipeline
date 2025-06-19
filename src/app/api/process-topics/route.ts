import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { unstructuredTopicList } = await request.json();

    if (!unstructuredTopicList) {
      return NextResponse.json(
        { error: 'unstructuredTopicList is required' },
        { status: 400 }
      );
    }

    

    const body = {
      "model": "gpt-4.1",
      "input": [
        {
          "role": "user",
          "content": [
            {
              "type": "input_text",
              "text": unstructuredTopicList
            }
          ]
        }
      ],
      "temperature": 1,
      "top_p": 1,
      "text": {
        "format": {
          "type": "json_schema",
          "name": "topic_list",
          "schema": {
            "type": "object",
            "properties": {
              "steps": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "topic": { "type": "string" },
                  },
                  "required": ["topic"],
                  "additionalProperties": false
                }
              }
            },
            "required": ["steps"],
            "additionalProperties": false
          },
          "strict": true
        }
      }
    };

    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };

    const response = await fetch('https://api.openai.com/v1/responses', options);
    
    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const stringListUntrimmed = data.output[0].content[0].text;
    console.log(stringListUntrimmed);

    const stringList = stringListUntrimmed.substring(11, stringListUntrimmed.length - 3);
    console.log(stringList);
    const list = stringList.split("},{");

    return NextResponse.json([
      { topics: list[0] }
    ]);

  } catch (error) {
    console.error('Error processing topics:', error);
    return NextResponse.json(
      { error: 'Failed to process topics' },
      { status: 500 }
    );
  }
} 