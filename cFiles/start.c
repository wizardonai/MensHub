#include <stdlib.h>

int main()
{
  system("cmd /K \"cd client & yarn start \"");
  system("cmd /K \"cd httpServer & node serverHttp \"");
  system("cmd /K \"cd server & node server \"");
  return 0;
}
