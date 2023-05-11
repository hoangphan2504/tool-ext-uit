from os import environ
from Bard import Chatbot


#token = environ.get("BARD_TOKEN")
token = "VwiEMLomF60iDggN15g7xzFBIRLd2QIOWDbX1Oy3ewiuJfYuPvfzveT0yz_QWbc6LslAaA."
str = input()
def bot(str, token):
    chatbot = Chatbot(token)
    result = chatbot.ask(str)
    return result['content']
print(bot(str, token))

#"""Please paraphrase this sentence as the IELTS 7.0 writer: to get the best achievement in this phase, the learner should have some programming 
 #   background (e.g. Python/C++/JS). Although with the support of ChatGPT, some basic knowledge about web development process such as front-end, back-end are recommended. 
  #  After finishing this phase, the learners could build their own applications using OpenAI API such as Grammarly, Mini game like Flappy bird"""