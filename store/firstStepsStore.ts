import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Step {
  id: number;
  title: string;
  description: string;
  contentMarkdown: string;
}

interface FirstStepsStore {
  steps: Step[];
  setSteps: (steps: Step[]) => void;
}

const defaultSteps: Step[] = [
  {
    id: 1,
    title: 'Habilitação do Produto (Configuração do Cliente)',
    description: 'Para começar a configurar sua API, o primeiro passo é habilitar o produto "SSX Tracking Integration" no cadastro ou template de cliente.',
    contentMarkdown: 'Após habilitar o produto, é necessário definir os dias de histórico e intervalo de consulta na aba **"Dados do web service de rastreamento"**.\n\n> **Atenção:** O nome do cliente só aparecerá no cadastro de integração (próximo passo) se ele tiver este produto habilitado.'
  },
  {
    id: 2,
    title: 'Cadastro do Tipo de Integração',
    description: 'Acesse a tela de "Configurações de Integrações" no SSX para cadastrar um novo tipo de integração e gerar a chave de acesso.',
    contentMarkdown: 'Esse cadastro irá gerar o **HashAuth**, que você utilizará junto com o login e senha ao consumir o método de Login.\n\n*Nota:* O login e senha que você usará para o método é o mesmo de qualquer usuário pertencente a esse cliente. Logo, o usuário também deve ter permissão de acesso à integração.'
  },
  {
    id: 3,
    title: 'Gerando o Token de Acesso (Login)',
    description: 'Através do método de Login, geramos o Access Token (formato JWT). Ele é utilizado para autenticar todas as outras funcionalidades e integrações da API.',
    contentMarkdown: 'O endpoint utilizado é o **POST integration.systemsatx.com.br/Login**. Você pode enviar a requisição utilizando `form-data` ou JSON, informando:\n\n- **Username:** Login do usuário\n- **Password:** Senha do usuário\n- **HashAuth:** Chave gerada na configuração da integração\n\n> **Obs:** O token possui uma validade de 24 horas. É necessário que em sua aplicação haja a emissão diária de um novo token. O token a ser utilizado é todo o conteúdo após a chave `"Access Token"`, sem as aspas.'
  },
  {
    id: 4,
    title: 'Consumindo o Primeiro Método',
    description: 'Com o token em mãos, você pode consumir um método que retorne dados, como o histórico de posições (PositionHistory/List).',
    contentMarkdown: 'Utilizaremos a própria documentação (Swagger) ou uma ferramenta como o Postman para fazer nossa requisição. Passe o token gerado no Header `Authorization: Bearer <token>` e envie uma requisição **POST** para `/Tracking/PositionHistory/List` (ou `/v3/Tracking/PositionHistory/List` dependendo da versão).\n\n**Filtros e Parâmetros:** Métodos como o `PositionHistory/List` geralmente aceitam parâmetros em JSON para filtrar o resultado (ex: PropertyName, Condition, Value). No entanto, **métodos sem parâmetros** irão apenas listar informações fixas (como o método `/Tracking/Telemetry/List`) e não precisam do array de filtros no body.\n\n> **Dica sobre o Swagger:** O Swagger possui uma aba **Schema** ao lado do "Example Value", que tem a função de traduzir as informações dos filtros e retornos de cada endpoint, bem como mostrar os parâmetros obrigatórios.'
  },
  {
    id: 5,
    title: 'Exemplos de Implementação',
    description: 'Abaixo estão alguns exemplos práticos de como utilizar as APIs através de linguagens comuns como C#, Python e Kotlin.',
    contentMarkdown: `### Exemplo em C#
\`\`\`csharp
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

public class Program
{
    static async Task Main(string[] args)
    {
        var url = "https://integration.systemsatx.com.br/v3/Tracking/PositionHistory/List";
        var client = new HttpClient();
        
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "TOKEN");
        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        
        var parameters = new[]
        {
            new {
                PropertyName = "TrackedUnit",
                Condition = "Equal",
                Value = "LLU-0000"
            }
        };
        
        var json = Newtonsoft.Json.JsonConvert.SerializeObject(parameters);
        var content = new StringContent(json, Encoding.UTF8, "application/json");
        
        var response = await client.PostAsync(url, content);
        var responseString = await response.Content.ReadAsStringAsync();
        
        Console.WriteLine(responseString);
    }
}
\`\`\`

### Exemplo em Python
\`\`\`python
import requests

url = "https://integration.systemsatx.com.br/Tracking/PositionHistory/List"
headers = {
    "Authorization": "Bearer SEU_TOKEN",
    "Content-Type": "application/json"
}

params = [
    {
        "PropertyName": "TrackedUnit",
        "Condition": "Equal",
        "Value": "LLU-0000"
    }
]

response = requests.post(url, headers=headers, json=params)

if response.status_code == 200 and response.content:
    print(response.json())
else:
    print("Erro ao acessar o endpoint:", response.text)
\`\`\`

### Exemplo em Kotlin
\`\`\`kotlin
package com.example.api
import java.io.*
import java.net.HttpURLConnection
import java.net.URL

fun main() {
    val url = URL("https://integration.systemsatx.com.br/Tracking/PositionHistory/List")
    val token = "SEU_TOKEN"
    
    val json = """
    [
        {
            "PropertyName": "TrackedUnit",
            "Condition": "Equal",
            "Value": "LLU-0000"
        }
    ]
    """.trimIndent()
    
    val connection = url.openConnection() as HttpURLConnection
    connection.requestMethod = "POST"
    connection.setRequestProperty("Authorization", "Bearer $token")
    connection.setRequestProperty("Content-Type", "application/json")
    connection.doOutput = true
    
    val os = connection.outputStream
    val writer = OutputStreamWriter(os, "UTF-8")
    writer.write(json)
    writer.flush()
    writer.close()
    
    val responseCode = connection.responseCode
    if (responseCode == HttpURLConnection.HTTP_OK) {
        val bufferedReader = BufferedReader(InputStreamReader(connection.inputStream))
        var line: String?
        val responseBody = StringBuilder()
        while (bufferedReader.readLine().also { line = it } != null) {
            responseBody.append(line)
        }
        bufferedReader.close()
        println(responseBody.toString())
    } else {
        println("Erro ao fazer requisição. Código de resposta HTTP: $responseCode")
    }
    connection.disconnect()
}
\`\`\``
  }
];

export const useFirstStepsStore = create<FirstStepsStore>()(
  persist(
    (set) => ({
      steps: defaultSteps,
      setSteps: (steps) => set({ steps }),
    }),
    {
      name: 'first-steps-storage-v2',
    }
  )
);
