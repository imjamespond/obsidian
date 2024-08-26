https://stackoverflow.com/questions/41381064/vscode-c-sharp-add-reference-to-custom-assembly

simpler, just add the following: 

1) modify the myproject.csproj file 

```
    <ItemGroup>
     <Reference Include="DllComunVb2008">
       <HintPath>..\Dlls\DllComunVb2008.dll</HintPath>
     </Reference>
    </ItemGroup>
```

2) Add the using of the library you are going to use. Example: using Dllcomun; 