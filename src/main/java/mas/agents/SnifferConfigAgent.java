package mas.agents;

import jade.core.AID;
import jade.core.Agent;
import jade.core.behaviours.OneShotBehaviour;
import jade.lang.acl.ACLMessage;

import java.util.ArrayList;
import java.util.List;

public class SnifferConfigAgent extends Agent {
    
    @Override
    protected void setup() {
        // Aguarda um pouco para garantir que todos os agentes estejam prontos
        addBehaviour(new OneShotBehaviour() {
            @Override
            public void action() {
                try {
                    Thread.sleep(1000); // Aguarda 1 segundo
                    
                    // Lista de agentes para monitorar
                    List<AID> agentsToSniff = new ArrayList<>();
                    agentsToSniff.add(new AID("ca", AID.ISLOCALNAME));
                    agentsToSniff.add(new AID("sda", AID.ISLOCALNAME));
                    agentsToSniff.add(new AID("tda", AID.ISLOCALNAME));
                    agentsToSniff.add(new AID("s1", AID.ISLOCALNAME));
                    agentsToSniff.add(new AID("s2", AID.ISLOCALNAME));
                    agentsToSniff.add(new AID("s3", AID.ISLOCALNAME));
                    
                    // Envia mensagem para o Sniffer adicionar os agentes
                    AID snifferAID = new AID("sniffer", AID.ISLOCALNAME);
                    ACLMessage sniffMsg = new ACLMessage(ACLMessage.REQUEST);
                    sniffMsg.addReceiver(snifferAID);
                    sniffMsg.setOntology("JADE-Sniffer");
                    
                    // Adiciona cada agente ao conteúdo
                    StringBuilder content = new StringBuilder();
                    for (AID agent : agentsToSniff) {
                        content.append(agent.getName()).append(";");
                    }
                    sniffMsg.setContent(content.toString());
                    send(sniffMsg);
                    
                    System.out.println("[SnifferConfig] Configured Sniffer to monitor: " + agentsToSniff.size() + " agents");
                    
                    // Auto-termina depois de configurar
                    doDelete();
                    
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });
    }
}
