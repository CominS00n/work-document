<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="space-y-2">
        <h1 class="font-bold text-lg">Documentation All Project</h1>
        <div class="flex justify-between">
          <v-card min-width="540">
            <v-card-title>
              <h2 class="flex items-center">
                Python<box-icon type="logo" name="python" class="fill-blue-500"></box-icon>
              </h2>
            </v-card-title>
            <v-card-text>
              <h5>Install Python</h5>
              <p>Python version 3.10.11</p>
            </v-card-text>
            <v-card-text>
              <h5>Create Virtual Environments</h5>
              <v-code>python -m venv myenv</v-code>
            </v-card-text>
            <v-card-text>
              <h5>Activate Virtual Environments</h5>
              <p>Linux/Mac:<v-code>source myenv/bin/activate</v-code></p>
              <p>Windows:<v-code>myenv/Script/activate</v-code></p>
            </v-card-text>
            <v-card-text>
              <h5>Freeze Package</h5>
              <v-code>pip freeze -> requirements.txt</v-code>
            </v-card-text>
            <v-card-text>
              <h5>Install Package</h5>
              <v-code>pip install -r requirements.txt</v-code>
            </v-card-text>
          </v-card>
          <v-card min-width="540">
            <v-card-title>
              <h2 class="flex items-center">
                Vue<box-icon type="logo" name="vuejs" class="fill-green-500"></box-icon>
              </h2>
            </v-card-title>
            <v-card-text>
              <h5>Install Node.js</h5>
              <a href="https://nodejs.org/en" target="_blank" rel="Node" class="underline"
                >Node JS</a
              >
            </v-card-text>
            <v-card-text>
              <h4>Create Project</h4>
              <div class="flex flex-col gap-y-2">
                <v-code>vue create my-project</v-code>
                <v-code>
                  <div>
                    <p>Select</p>
                    <p>> vue</p>
                    <p>> typescript || javascript</p>
                  </div>
                </v-code>
                <v-code>npm install</v-code>
                <v-code>npm run dev</v-code>
              </div>
            </v-card-text>
          </v-card>
        </div>
        <v-card>
          <v-card-title
            ><h2 class="flex items-center">
              GitHub<box-icon type="logo" name="github" class="fill-gray-500"></box-icon></h2
          ></v-card-title>
          <v-card-text>
            <a
              href="https://github.com/develop-billone"
              target="_blank"
              rel="noopener noreferrer"
              class="underline"
              >GitHub</a
            >
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
