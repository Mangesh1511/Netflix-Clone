#include<bits/stdc++.h>
using namespace std;

int main()
{
   

    vector<string>str;

    str.push_back("cad");
    str.push_back("abcd");

    sort(str.begin(),str.end());
    for(auto v:str)
    cout<<v<<" ";
    cout<<endl;

 return 0;
}